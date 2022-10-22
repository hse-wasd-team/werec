/*
 * Swagger WeRec - OpenAPI 3.0
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.3
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;


namespace WeRecWebApp.Apis
{ 
    /// <summary>
    /// 
    /// </summary>
    [Route("api/v1/videos")]
    public class VideoApiController : Controller
    { 
        /// <summary>
        /// Get videos
        /// </summary>
        /// <remarks>Returns an array of video links</remarks>
        /// <param name="feedId">ID of feed</param>
        /// <param name="keyword">keyword</param>
        /// <response code="200">Returns list of video links</response>
        /// <response code="400">Invalid feed id or keyword supplied</response>
        /// <response code="404">Feed or keyword not found</response>
        [HttpGet("{feedId}/{keyword}/")]
        public virtual IActionResult GetVideosByFeedId([FromRoute][Required]string feedId, [FromRoute][Required]string keyword)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200, default(List<string>));

            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);
            string exampleJson = null;
            exampleJson = "[ \"https://www.youtube.com/watch?v=o1YenjwOp-A\", \"https://www.youtube.com/watch?v=cjO_yorTfP8\" ]";
            
                        var example = exampleJson != null
                        ? JsonConvert.DeserializeObject<List<string>>(exampleJson)
                        : default(List<string>);            //TODO: Change the data returned
            return new JsonResult(example);
        }
    }
}