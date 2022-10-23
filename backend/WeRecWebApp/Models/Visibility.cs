using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WeRecWebApp.Models
{
    /// <summary>
    /// visibility of the feed
    /// </summary>
    /// <value>visibility of the feed</value>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum VisibilityEnum
    {
        /// <summary>
        /// Enum PublicEnum for public
        /// </summary>
        [EnumMember(Value = "public")]
        PublicEnum = 0,
        /// <summary>
        /// Enum PrivateEnum for private
        /// </summary>
        [EnumMember(Value = "private")]
        PrivateEnum = 1        }
}