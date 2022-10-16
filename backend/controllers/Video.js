'use strict';

var utils = require('../utils/writer.js');
var Video = require('../service/VideoService');

module.exports.getVideosByFeedId = function getVideosByFeedId (req, res, next, feedId, keyword) {
  Video.getVideosByFeedId(feedId, keyword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
