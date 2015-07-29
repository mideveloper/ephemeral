var MemCache = require("./cache-memcache"),
    LocalCache = require("./cache-local"),
    RedisCache = require("./cache-redis");

function initialize(setting) {
    if (setting.client === "memcache") {
        return new MemCache();
    }
    else if(setting.client === "redis"){
        return new RedisCache();
    } else {
        return new LocalCache();
    }
}

module.exports = {
    initialize: initialize
};