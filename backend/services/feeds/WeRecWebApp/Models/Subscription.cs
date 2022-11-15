using System.Runtime.Serialization;

namespace WeRecWebApp.Models
{
    public class Subscription
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "feed")]
        public string FeedId { get; set; }

        [DataMember(Name = "user")]
        public string User { get; set; }
    }
}