using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Telegram.Bot;
using Telegram.Bot.Extensions.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using WeRecWebApp.Models;

namespace TelegramBotExperiments
{

    class Program
    {
        static ITelegramBotClient bot = new TelegramBotClient("5742927794:AAFzw_NuCRRUHZGHW3RLm5s2oHcvswXyHUs");
        static ReplyKeyboardMarkup feedsKeyboard = new ReplyKeyboardMarkup(new[]
        {
            new KeyboardButton[] { "View my feeds", "Browse feeds" }
        });

        private static Dictionary<string, string> hisotry = new Dictionary<string, string>();
        private static List<Feed> usersFeeds = new List<Feed>();
        public static async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(update));
            if (update.Type == Telegram.Bot.Types.Enums.UpdateType.Message)
            {
                if(update.Message.From.Username != "ryusupova") return;
                
                var message = update.Message;
                if (message.Text == "/start")
                {
                    var startKeyboard = new ReplyKeyboardMarkup(new[]
                    {
                        new KeyboardButton[] { "Browse feeds" },
                        new KeyboardButton[] { "Do a barrel" }
                    });

                    await botClient.SendTextMessageAsync(message.Chat,
                        "Welcome to the club buddy! You don't have any feeds yet, lets browse and find some.",
                        replyMarkup: startKeyboard);
                    return;
                }

                if (message.Text == "Do a barrel")
                {
                    await botClient.SendDocumentAsync(message.Chat,
                        "https://media.tenor.com/O5oLM6rrW54AAAAC/anime-rolling.gif");
                    return;
                }

                if (message.Text == "Browse feeds")
                {
                    await botClient.SendTextMessageAsync(message.Chat,
                        "You will view random feeds now, select the one you like. You can view them later.", replyMarkup: feedsKeyboard);
                    await SendFeed(message.Chat, botClient);
                    return;
                }

                if (message.Text == "View my feeds")
                {
                    var feeds = await GetUserSubs(message.From.Id.ToString(), message.Chat, botClient);
                    usersFeeds = feeds.ToList();
                    var feedsKeyboard = GetInlineKeyboard(feeds.Select(f => f.Name).ToArray());
                    await botClient.SendTextMessageAsync(message.Chat,
                        $"You have {feeds.Length} {(feeds.Length == 1 ? "feed" : "feeds")}. Please select one to view available keywords.",
                        replyMarkup: feedsKeyboard);
                    return;
                }

                if (usersFeeds.Select(f => f.Name).Contains(message.Text))
                {
                    var _feedId = usersFeeds.Single(f => f.Name == message.Text).Id;
                    if (hisotry.ContainsKey(message.Chat.Id.ToString()))
                    {
                        hisotry[message.Chat.Id.ToString()] = _feedId.ToString();
                    }
                    else
                    {
                        hisotry.Add(message.Chat.Id.ToString(), _feedId.ToString());
                    }

                    using (var client = new HttpClient())
                    {
                        var response = await client.GetAsync($"http://localhost:500/api/v1/feeds/{_feedId.ToString()}");
                        var content = await response.Content.ReadAsStringAsync();
                        var feed = JsonConvert.DeserializeObject<Feed>(content);

                        var keywordsKeyboard = GetInlineKeyboard(feed.Configurations.Select(c => $"keyword {c.Keyword}").ToArray());
                        await botClient.SendTextMessageAsync(message.Chat,
                            $"Select a keyword to recive videos",
                            replyMarkup: keywordsKeyboard);
                        return;
                    }

                    var feeds = await GetUserSubs(message.From.Id.ToString(), message.Chat, botClient);
                    var feedsKeyboard = GetInlineKeyboard(feeds.Select(f => f.Name).ToArray());
                    await botClient.SendTextMessageAsync(message.Chat, $"you have {feeds.Length} feeds", replyMarkup: feedsKeyboard);
                    return;
                }

                var pattern = @"(keyword) (.*)";
                var res = Regex.Match(message.Text, pattern);
                if (res.Groups.Values.Count() > 1 && res.Groups.Values.ElementAt(2) != null && hisotry.ContainsKey(message.Chat.Id.ToString()))
                {
                    using (var client = new HttpClient())
                    {
                        var response = await client.GetAsync(
                            $"http://localhost:5000/api/v1/videos/{hisotry[message.Chat.Id.ToString()]}/{res.Groups.Values.ElementAt(2)}");
                        var content = await response.Content.ReadAsStringAsync();
                        var links = JsonConvert.DeserializeObject<string[]>(content);
                        foreach (var link in links)
                        {
                            await botClient.SendTextMessageAsync(message.Chat, link, replyMarkup: feedsKeyboard);
                        }
                    }
                }
            }
            
            if (update.Type == UpdateType.CallbackQuery) // only for like callback
            {
                if (update.CallbackQuery.Data != null && Guid.TryParse(update.CallbackQuery.Data, out Guid _feedId))
                {
                    await SubUser(update.CallbackQuery.From.Id.ToString(), _feedId.ToString(), update.CallbackQuery.Message.Chat, botClient);
                    //await botClient.SendTextMessageAsync(update.CallbackQuery.Message.Chat, "you liked it!");
                }
                else
                {
                    await SendFeed(update.CallbackQuery.Message.Chat, botClient);
                }
            }
        }

        private static ReplyKeyboardMarkup GetInlineKeyboard(string[] stringArray)
        {
            var buttons = stringArray.Select(i => new[] { new KeyboardButton(i) })
                .ToArray();

            var replyMarkup = new ReplyKeyboardMarkup(buttons);
            return replyMarkup;
        }

        private static async Task<Feed[]> GetUserSubs(string userId, Chat chat, ITelegramBotClient botClient)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"http://localhost:5000/api/v1/subscriptions/{userId}");
                var content = await response.Content.ReadAsStringAsync();
                var feeds = JsonConvert.DeserializeObject<Feed[]>(content);
                return feeds;
            }
        }

        
        private static async Task SubUser(string userId, string feedId, Chat chat, ITelegramBotClient botClient)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PostAsync($"http://localhost:5000/api/v1/subscriptions/{feedId}/{userId}", null);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    await botClient.SendTextMessageAsync(chat, $"Saved! {char.ConvertFromUtf32(0x00002B06)}", ParseMode.Html);
                }
                else
                {
                    await botClient.SendTextMessageAsync(chat, "Smth went wrong and we could not save your choice, sowwy ~n~!");
                }
                //var content = await response.Content.ReadAsStringAsync();
                //var feeds = JsonConvert.DeserializeObject<Feed[]>(content);
                //var random = new Random();
                //return feeds.ElementAt(random.Next(feeds.Length));
            }
        }

        private static async Task SendFeed(Chat chat, ITelegramBotClient botClient)
        {
            var feed = await GetFeed();

            var inlineKeyboard = new InlineKeyboardMarkup(new[]
            {
                new[]
                {
                    InlineKeyboardButton.WithCallbackData("Me likey", feed.Id),
                    InlineKeyboardButton.WithCallbackData("Yikes", "dislike") // придет update с другим типом, обрабатываем, пишем в базу
                },
                new[]
                {


                    InlineKeyboardButton.WithUrl("See more", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
                },
            });
            
            string[] responses = new[] { "How about this one?", "And this?", "Do you like it?", "Is this one good?", "This?"};
            var random = new Random();

            await botClient.SendTextMessageAsync(chat, GetMessage(feed), ParseMode.Html, replyMarkup: inlineKeyboard);
            await botClient.SendTextMessageAsync(chat, responses[random.Next(responses.Length)], replyMarkup: feedsKeyboard);
        }

        private static string GetMessage(Feed feed)
        {
            var msg =
 @$"Feed <ins><strong>{feed.Name}</strong></ins> can be describe as

<em>{feed.Description}</em>

This feed has <strong>{feed.Review.Comments.Count}</strong> {(feed.Review.Comments.Count == 1 ? "review":"reviews")} with overall raiting of {string.Concat(Enumerable.Repeat(char.ConvertFromUtf32(0x00002B50), feed.Review.Raiting ?? 0))}";
            return msg;
        }
        private async static Task<Feed> GetFeed()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("http://localhost:5000/api/v1/feeds");
                var content = await response.Content.ReadAsStringAsync();
                var feeds = JsonConvert.DeserializeObject<Feed[]>(content);
                var random = new Random();
                return feeds.ElementAt(random.Next(feeds.Length));
            }
        }

        public static async Task HandleErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(exception));
        }
        
        static void Main(string[] args)
        {
            Console.WriteLine("Launch bot " + bot.GetMeAsync().Result.FirstName);

            var cts = new CancellationTokenSource();
            var cancellationToken = cts.Token;
            var receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = { }, // receive all update types
            };
            bot.StartReceiving(
                HandleUpdateAsync,
                HandleErrorAsync,
                receiverOptions,
                cancellationToken
            );
            Console.ReadLine();
        }
    }
}