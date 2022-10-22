using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
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
                        await InsertCustomersSampleData(customersDb);
                    }
                }
            }
        }

        public async Task InsertCustomersSampleData(FeedDbContext db)
        {
            var feedConfigurations = GetFeedConfigurations();
            db.Configurations.AddRange(feedConfigurations);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(FeedDbSeeder)}: " + exp.Message);
                throw;
            }

            var reviews = GetReviews();
            db.Reviews.AddRange(reviews);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(FeedDbSeeder)}: " + exp.Message);
                throw;
            }

            var feeds = GetFeeds(feedConfigurations, reviews.First());
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

        private List<FeedConfiguration> GetFeedConfigurations()
        {
            return new List<FeedConfiguration>()
            {
                new FeedConfiguration()
                {
                    Id = "1",
                    Keyword = "test",
                    Quantity = 1,
                    Mode = FeedConfiguration.ModeEnum.NewEnum,
                    Sources = new List<string>() { "test1", "test2" }
                }
            };
        }

        private List<Review> GetReviews()
        {
            return new List<Review>()
            {
                new Review()
                {
                    Id = "1",
                    Raiting = 1,
                    Comments = new List<string>() { "test1", "test2" }
                }
            };
        }

        private List<Feed> GetFeeds(List<FeedConfiguration> configurations, Review review)
        {
            return new List<Feed>()
            {
                new Feed()
                {
                    Id = "1",
                    CreatorId = "1",
                    CreatorName = "test",
                    Name = "test",
                    Tags = new List<string>() { "test1", "test2" },
                    Description = "test",
                    Visibility = VisibilityEnum.PublicEnum,
                    Configurations = configurations,
                    Review = review
                }
            };
        }

    }
}