'use strict';

var utils = require('../utils/writer.js');
var Video = require('../service/VideoService');

module.exports.getVideosByConfigurationID = function getVideosByConfigurationID (req, res, next, configurationId) {
  Video.getVideosByConfigurationID(configurationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
