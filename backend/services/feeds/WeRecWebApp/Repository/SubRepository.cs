using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public class SubRepository : ISubRepository
    {
        private readonly FeedDbContext _context;
        private readonly ILogger _logger;

        public SubRepository(FeedDbContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("SubRepository");
        }
        
        public async Task<List<Feed>> GetFeeds(string userId)
        {
            var userSubs = _context.Subscriptions.Where(s => s.User == userId).Select(s => s.FeedId);
            _logger.LogDebug(userSubs.Count().ToString());
            return await _context.Feeds
                .Where(f => userSubs.Contains(f.Id))
                .Include(f => f.Configurations)
                .Include(f => f.Review)
                .ToListAsync();
        }

        public async Task<bool> Subscribe(string feedId, string userId)
        {
            var feed = await _context.Feeds.SingleOrDefaultAsync(f => f.Id == feedId);

            if (feed == null) return false;
            
            var result = _context.Subscriptions.Add(new Subscription
            {
                Id = Guid.NewGuid().ToString(),
                FeedId = feed.Id,
                User = userId
            });
            await _context.SaveChangesAsync();
            return result != null;
        }
    }
}