'use strict';

var utils = require('../utils/writer.js');
var Feed = require('../service/FeedService');

module.exports.addFeed = function addFeed (req, res, next, body) {
  Feed.addFeed(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addFeed = function addFeed (req, res, next, body) {
  Feed.addFeed(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteFeed = function deleteFeed (req, res, next, feedId) {
  Feed.deleteFeed(feedId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFeedById = function getFeedById (req, res, next, feedId) {
  Feed.getFeedById(feedId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFeeds = function getFeeds (req, res, next) {
  Feed.getFeeds()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateFeed = function updateFeed (req, res, next, body, feedId) {
  Feed.updateFeed(body, feedId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateFeed = function updateFeed (req, res, next, body, feedId) {
  Feed.updateFeed(body, feedId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
