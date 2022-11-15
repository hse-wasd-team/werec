using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WeRecWebApp.Models
{
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum VideoMode
    {
        /// <summary>
        /// Enum NewEnum for new
        /// </summary>
        [EnumMember(Value = "AllFresh")]
        AllFresh = 0,

        /// <summary>
        /// Enum NewEnum for new
        /// </summary>
        [EnumMember(Value = "AllRandom")]
        AllRandom = 1,

        /// <summary>
        /// Enum NewEnum for new
        /// </summary>
        [EnumMember(Value = "EachFresh")]
        EachFresh = 2,

        /// <summary>
        /// Enum NewEnum for new
        /// </summary>
        [EnumMember(Value = "EachRandom")]
        EachRandom = 3
    }
}