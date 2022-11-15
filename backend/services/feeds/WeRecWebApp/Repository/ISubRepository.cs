using System.Collections.Generic;
using System.Threading.Tasks;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public interface ISubRepository
    {
        Task<List<Feed>> GetFeeds(string userId);
        
        Task<bool> Subscribe(string feedId, string userId);
    }
}