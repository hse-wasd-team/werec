'use strict';


/**
 * Get videos
 * Returns an array of video links
 *
 * feedId String ID of feed
 * keyword String keyword
 * returns List
 **/
exports.getVideosByFeedId = function(feedId,keyword) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "https://www.youtube.com/watch?v=o1YenjwOp-A", "https://www.youtube.com/watch?v=cjO_yorTfP8" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

