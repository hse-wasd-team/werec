'use strict';


/**
 * Get videos
 * Returns an array of video links
 *
 * configurationId String ID of configuration
 * returns List
 **/
exports.getVideosByConfigurationID = function(configurationId) {
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

