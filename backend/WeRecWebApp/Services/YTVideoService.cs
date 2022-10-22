using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeRecWebApp.Models;

namespace WeRecWebApp.Services
{
    public class YTVideoService
    {
        private readonly YouTubeService service;

        private readonly Dictionary<VideoMode, Func<Feed, string, Task<List<string>>>> videoModesProcessors;

        public YTVideoService(IOptions<YouTubeSettings> youTubeSettings)
        {
            service = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = youTubeSettings.Value.Key,
                ApplicationName = this.GetType().ToString()
            });

            videoModesProcessors = new Dictionary<VideoMode, Func<Feed, string, Task<List<string>>>>
            {
                [VideoMode.AllFresh] = GetAllFreshVideos,
                //[VideoMode.AllRandom] = GetAllRandomVideos,
                //[VideoMode.EachFresh] = GetEachFreshVideos,
                //[VideoMode.EachRandom] = GetEachRandomVideos
            };
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
        private async Task<List<string>> GetAllFreshVideos(Feed feed, string keyWord)
        {
            var config = feed.Configurations.Single(c => c.Keyword == keyWord);

            var searchListRequest = service.Search.List("snippet");
            List<SearchResult> results = new List<SearchResult>();

            foreach (var id in config.Sources)
            {
                searchListRequest.ChannelId = id;
                searchListRequest.MaxResults = config.Quantity;
                searchListRequest.Order = SearchResource.ListRequest.OrderEnum.Date;

                var result = await searchListRequest.ExecuteAsync();
                results.AddRange(result.Items);
            }

            var random = new Random();
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