using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public class FeedRepository : IFeedRepository
    {
        private readonly FeedDbContext _context;
        private readonly ILogger _logger;

        public FeedRepository(FeedDbContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("FeedRepository");
        }

        public async Task<List<Feed>> GetFeeds()
        {
            return await _context.Feeds
                .Include(f => f.Configurations)
                .Include(f => f.Review)
                .ToListAsync();
        }

        public async Task<Feed> GetFeed(string id)
        {
            return await _context.Feeds
                .Include(f => f.Configurations)
                .Include(f => f.Review)
                .SingleOrDefaultAsync(f => f.Id == id);
        }

        public async Task<Feed> InsertFeed(Feed feed)
        {
            await _context.Feeds.AddAsync(feed);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(InsertFeed)}: " + exp.Message);
            }

            return await GetFeed(feed.Id);
        }

        public async Task<bool> UpdateFeed(Feed feed)
        {
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(UpdateFeed)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteFeed(string id)
        {
            var feed = await GetFeed(id);
            if (feed == null) return false;
            _context.Remove(feed);
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(DeleteFeed)}: " + exp.Message);
            }
            return false;
        }
    }
}