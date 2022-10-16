'use strict';


/**
 * Add new feed
 * Add new feed
 *
 * body PostPutFeedExample Create new Feed
 * returns Feed
 **/
exports.addFeed = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ [ "10/10", "wow" ], [ "10/10", "wow" ] ]
  },
  "visibility" : "public",
  "configurations" : [ {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  }, {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  } ],
  "name" : "Feed name",
  "creatorId" : "LkxGoU",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "id" : "e56139c9-ee6f-4775-a581-34ce8c1878e0",
  "tags" : [ "relax", "chill" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add new feed
 * Add new feed
 *
 * body PostPutFeedExample Create new Feed
 * returns Feed
 **/
exports.addFeed = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ [ "10/10", "wow" ], [ "10/10", "wow" ] ]
  },
  "visibility" : "public",
  "configurations" : [ {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  }, {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  } ],
  "name" : "Feed name",
  "creatorId" : "LkxGoU",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "id" : "e56139c9-ee6f-4775-a581-34ce8c1878e0",
  "tags" : [ "relax", "chill" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete feed by ID
 *
 * feedId String ID of the feed that needs to be altered
 * no response value expected for this operation
 **/
exports.deleteFeed = function(feedId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get feed information by id
 * Returns feed information
 *
 * feedId String ID of the feed that needs to be altered
 * returns Feed
 **/
exports.getFeedById = function(feedId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ [ "10/10", "wow" ], [ "10/10", "wow" ] ]
  },
  "visibility" : "public",
  "configurations" : [ {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  }, {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  } ],
  "name" : "Feed name",
  "creatorId" : "LkxGoU",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "id" : "e56139c9-ee6f-4775-a581-34ce8c1878e0",
  "tags" : [ "relax", "chill" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all feeds
 * Returns all feed information
 *
 * returns AllFeedExample
 **/
exports.getFeeds = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "72fd104c-4500-4c9c-8b49-223ea1d26d4b",
  "creatorId" : "LkxGoU",
  "name" : "feedname",
  "tags" : [ "relax", "chill" ],
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "visibility" : "public",
  "configurations" : [ {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  }, {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  } ],
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ "10/10", "wow" ]
  }
}, {
  "id" : "1e1adbf9-fad5-417b-9eed-900146ce65d1",
  "creatorId" : "LkxGoU",
  "name" : "feedname",
  "tags" : [ "relax", "chill" ],
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "visibility" : "public",
  "configurations" : [ {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  }, {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  } ],
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ "10/10", "wow" ]
  }
}, {
  "id" : "5032011d-6c76-4f49-9829-295f065215a4",
  "creatorId" : "LkxGoU",
  "name" : "feedname",
  "tags" : [ "relax", "chill" ],
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "visibility" : "public",
  "configurations" : [ {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  }, {
    "keyword" : "music",
    "quantity" : 4,
    "mode" : "new",
    "sources" : [ "https://www.youtube.com/channel/UCgzshmpXAc1T30PHQ3Yw2lw", "https://www.youtube.com/c/MTV" ]
  } ],
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ "10/10", "wow" ]
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing feed
 * Update an existing feed by Id
 *
 * body PostPutFeedExample Update an existent feed
 * feedId String ID of the feed that needs to be altered
 * returns Feed
 **/
exports.updateFeed = function(body,feedId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ [ "10/10", "wow" ], [ "10/10", "wow" ] ]
  },
  "visibility" : "public",
  "configurations" : [ {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  }, {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  } ],
  "name" : "Feed name",
  "creatorId" : "LkxGoU",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "id" : "e56139c9-ee6f-4775-a581-34ce8c1878e0",
  "tags" : [ "relax", "chill" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing feed
 * Update an existing feed by Id
 *
 * body PostPutFeedExample Update an existent feed
 * feedId String ID of the feed that needs to be altered
 * returns Feed
 **/
exports.updateFeed = function(body,feedId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "raiting" : {
    "raiting" : 6.9,
    "comments" : [ [ "10/10", "wow" ], [ "10/10", "wow" ] ]
  },
  "visibility" : "public",
  "configurations" : [ {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  }, {
    "mode" : "new",
    "quantity" : 4,
    "sources" : [ "https://www.youtube.com/watch?v=eLAHSRmFFzE", "https://www.youtube.com/watch?v=gxLKrLqXGoM" ],
    "keyword" : "music"
  } ],
  "name" : "Feed name",
  "creatorId" : "LkxGoU",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "id" : "e56139c9-ee6f-4775-a581-34ce8c1878e0",
  "tags" : [ "relax", "chill" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

