'use strict';


/**
 * Add new configuration
 * Add new configuration
 *
 * body PostPutConfigurationExample Create new configuration
 * returns Configuration
 **/
exports.addConfiguration = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mode" : "new",
  "quantity" : 4,
  "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add new configuration
 * Add new configuration
 *
 * body PostPutConfigurationExample Create new configuration
 * returns Configuration
 **/
exports.addConfiguration = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mode" : "new",
  "quantity" : 4,
  "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete configuration by ID
 *
 * configurationId String ID of the configuration that needs to be altered
 * no response value expected for this operation
 **/
exports.deleteConfiguration = function(configurationId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get configuration by feed id
 * Returns all feed's configurations
 *
 * feedId String ID of the feed retrieved configurations are for
 * returns ConfigurationsByFeedId
 **/
exports.getConfigurationByFeedId = function(feedId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music",
  "quantity" : 4,
  "mode" : "new",
  "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
}, {
  "configurationId" : "93fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "games",
  "quantity" : 4,
  "mode" : "new",
  "sources" : [ "https://www.youtube.com/@AstartaSky", "https://www.youtube.com/@Valkyrae1" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get configuration information by id
 * Returns configuration information
 *
 * configurationId String ID of the configuration that needs to be altered
 * returns Configuration
 **/
exports.getConfigurationById = function(configurationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mode" : "new",
  "quantity" : 4,
  "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing configuration
 * Update an existing configuration by Id
 *
 * body PostPutConfigurationExample Update an existent configuration
 * configurationId String ID of the configuration that needs to be altered
 * returns Configuration
 **/
exports.updateConfiguration = function(body,configurationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mode" : "new",
  "quantity" : 4,
  "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing configuration
 * Update an existing configuration by Id
 *
 * body PostPutConfigurationExample Update an existent configuration
 * configurationId String ID of the configuration that needs to be altered
 * returns Configuration
 **/
exports.updateConfiguration = function(body,configurationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mode" : "new",
  "quantity" : 4,
  "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
  "configurationId" : "45fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "keyword" : "music"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

