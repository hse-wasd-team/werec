using System.Collections.Generic;
using System.Threading.Tasks;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public interface IFeedRepository
    {
        Task<List<Feed>> GetFeeds();
        Task<Feed> GetFeed(string id);
        Task<Feed> InsertFeed(Feed feed);
        Task<bool> UpdateFeed(Feed feed);
        Task<bool> DeleteFeed(string id);
    }
}