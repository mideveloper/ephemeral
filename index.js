var MemCache = require("./lib/cache-memcache"),
    LocalCache = require("./lib/cache-local"),
    RedisCache = require("./lib/cache-redis");

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