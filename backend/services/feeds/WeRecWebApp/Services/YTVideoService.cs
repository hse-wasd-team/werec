using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using WeRecWebApp.Models;

namespace WeRecWebApp.Services
{
    public class YTVideoService
    {
        private readonly YouTubeService service;

        private readonly Dictionary<VideoMode, Func<Feed, string, Task<List<string>>>> videoModesProcessors;

        private readonly ILogger _logger;

        public YTVideoService(IOptions<YouTubeSettings> youTubeSettings, ILoggerFactory loggerFactory)
        {
            service = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = youTubeSettings.Value.Key,
                ApplicationName = this.GetType().ToString()
            });

            videoModesProcessors = new Dictionary<VideoMode, Func<Feed, string, Task<List<string>>>>
            {
                [VideoMode.AllFresh] = GetAllRandomVideos, // GetAllFreshVideos,
                [VideoMode.AllRandom] = GetAllRandomVideos, //GetAllRandomVideos,
                [VideoMode.EachFresh] = GetAllRandomVideos, //GetEachFreshVideos,
                [VideoMode.EachRandom] = GetAllRandomVideos, //GetEachRandomVideos
            };

            _logger = loggerFactory.CreateLogger("VideoService");
        }

        public async Task<IEnumerable<string>> GetVideos(Feed feed, string keyWord)
        {
            var config = feed.Configurations.Single(c => c.Keyword == keyWord);
            
            var func = videoModesProcessors[config.Mode];

            var videoIds = await func(feed, keyWord);

            return videoIds.Select(FormProperLink);
        }

        private string FormProperLink(string link) =>
            string.Format("https://www.youtube.com/watch?v={0}", link);
        private async Task<List<string>> GetAllRandomVideos(Feed feed, string keyWord)
        {
            var config = feed.Configurations.Single(c => c.Keyword == keyWord);

            var searchListRequest = service.Search.List("snippet");
            List<SearchResult> results = new List<SearchResult>();
            var random = new Random();

            foreach (var source in config.Sources)
            {
                searchListRequest.ChannelId = source;
                searchListRequest.MaxResults = random.Next(config.Quantity, config.Quantity + 30);

                Array values = Enum.GetValues(typeof(SearchResource.ListRequest.OrderEnum));
                var order = (SearchResource.ListRequest.OrderEnum) values.GetValue(random.Next(values.Length));

                searchListRequest.Order = order;

                results.AddRange((await searchListRequest.ExecuteAsync()).Items);
            }

            var links = new List<string>();
            HashSet<int> numbers = new HashSet<int>();
            while (numbers.Count < config.Quantity)
            {
                numbers.Add(random.Next(results.Count));
            }
            foreach (var number in numbers)
            {
                links.Add(results.ElementAt(number).Id.VideoId);
            }
            return links;
        }
    }
}