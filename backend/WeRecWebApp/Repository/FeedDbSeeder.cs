using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Bogus;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public class FeedDbSeeder
    {
        readonly ILogger _logger;

        public FeedDbSeeder(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger("DbSeederLogger");
        }

        public async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var customersDb = serviceScope.ServiceProvider.GetService<FeedDbContext>();
                if (await customersDb.Database.EnsureCreatedAsync())
                {
                    _logger.LogDebug("db is empty");
                    if (!await customersDb.Feeds.AnyAsync())
                    {
                        _logger.LogDebug("proceed to seed");
                        await InsertSampleData(customersDb);
                    }
                }
            }
        }

        private async Task InsertSampleData(FeedDbContext db)
        {
            var feeds = GetFeeds();
            db.Feeds.AddRange(feeds);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(FeedDbSeeder)}: " + exp.Message);
                throw;
            }
        }

        private List<Feed> GetFeeds()
        {
            var faker = new Faker<Feed>("en")
                .RuleFor(o => o.Id, f => f.Random.Guid().ToString())
                .RuleFor(o => o.Description, f => f.Lorem.Sentence())
                .RuleFor(o => o.Name, f => string.Join(' ', f.Lorem.Words()))
                .RuleFor(o => o.Review, f => new Review
                {
                    Id = f.Random.Guid().ToString(),
                    Raiting = f.Random.Int(1, 5),
                    Comments = f.Make(f.Random.Int(1, 10), () => f.Lorem.Sentence()).ToList()
                })
                .RuleFor(o => o.Tags, f => f.Lorem.Words().ToList())
                .RuleFor(o => o.Visibility, f => VisibilityEnum.PublicEnum)
                .RuleFor(o => o.CreatorId, f => f.Random.Guid().ToString())
                .RuleFor(o => o.CreatorName, f => f.Person.FullName)
                .RuleFor(o => o.Configurations, f => f.Make(f.Random.Int(1, 10), () => new FeedConfiguration
                {
                    Id = f.Random.Guid().ToString(),
                    Keyword = f.Lorem.Word(),
                    Quantity = f.Random.Int(1, 20),
                    Mode = f.PickRandom<VideoMode>(),
                    Sources = f.Make(f.Random.Int(1, 10), () => f.Random.Uuid().ToString()).ToList(),
                }).ToList());

            return faker.Generate(100);
        }
    }
}