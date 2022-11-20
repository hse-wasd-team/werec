'use strict';

var utils = require('../utils/writer.js');
var Configuration = require('../service/ConfigurationService');

module.exports.addConfiguration = function addConfiguration (req, res, next, body) {
  Configuration.addConfiguration(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addConfiguration = function addConfiguration (req, res, next, body) {
  Configuration.addConfiguration(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteConfiguration = function deleteConfiguration (req, res, next, configurationId) {
  Configuration.deleteConfiguration(configurationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getConfigurationByFeedId = function getConfigurationByFeedId (req, res, next, feedId) {
  Configuration.getConfigurationByFeedId(feedId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getConfigurationById = function getConfigurationById (req, res, next, configurationId) {
  Configuration.getConfigurationById(configurationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateConfiguration = function updateConfiguration (req, res, next, body, configurationId) {
  Configuration.updateConfiguration(body, configurationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateConfiguration = function updateConfiguration (req, res, next, body, configurationId) {
  Configuration.updateConfiguration(body, configurationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
