using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeRecWebApp.Repository;

namespace WeRecWebApp.Apis
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/v1/subscriptions")]
    public class SubscriptionsApi : Controller
    {
        private readonly ISubRepository _repo;
        public SubscriptionsApi(ISubRepository repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="feedId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost("{feedId}/{userId}/")]
        public async Task<IActionResult> Subscribe([FromRoute] [Required] string feedId, [FromRoute] [Required] string userId)
        {
            var result = await _repo.Subscribe(feedId, userId);
            if (!result)
            {
                return NotFound();
            }
            
            return Ok();
        }

        /// <summary>
        /// Get feed subscriptions for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetFeeds([FromRoute] [Required] string userId)
        {
            return Ok(await _repo.GetFeeds(userId));
        }
    }
}