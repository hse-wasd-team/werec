/*
 * Swagger WeRec - OpenAPI 3.0
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.3
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WeRecWebApp.Models { 
    /// <summary>
    /// 
    /// </summary>
    [DataContract]
    public class Review : IEquatable<Review>
    { 
        [DataMember(Name="id")]
        public string Id { get; set; }
        
        /// <summary>
        /// Gets or Sets Raiting
        /// </summary>

        [DataMember(Name="raiting")]
        public int? Raiting { get; set; }

        /// <summary>
        /// Gets or Sets Comments
        /// </summary>

        [DataMember(Name="comments")]
        public List<string> Comments { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class Review {\n");
            sb.Append("  Raiting: ").Append(Raiting).Append("\n");
            sb.Append("  Comments: ").Append(Comments).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Review)obj);
        }

        /// <summary>
        /// Returns true if Review instances are equal
        /// </summary>
        /// <param name="other">Instance of Review to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(Review other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    Raiting == other.Raiting ||
                    Raiting != null &&
                    Raiting.Equals(other.Raiting)
                ) && 
                (
                    Comments == other.Comments ||
                    Comments != null &&
                    Comments.SequenceEqual(other.Comments)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                var hashCode = 41;
                // Suitable nullity checks etc, of course :)
                    if (Raiting != null)
                    hashCode = hashCode * 59 + Raiting.GetHashCode();
                    if (Comments != null)
                    hashCode = hashCode * 59 + Comments.GetHashCode();
                return hashCode;
            }
        }

        #region Operators
        #pragma warning disable 1591

        public static bool operator ==(Review left, Review right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(Review left, Review right)
        {
            return !Equals(left, right);
        }

        #pragma warning restore 1591
        #endregion Operators
    }
}
