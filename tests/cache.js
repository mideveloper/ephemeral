var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    assert = chai.assert;

chai.use(chaiAsPromised);

describe("Cache", function() {

    var cache = require("../lib/index");
    var local_cacheObj, memcache_Obj, rediscache_Obj;

    before(function() {
        local_cacheObj = cache.initialize({
            client: "local"
        });
        memcache_Obj = cache.initialize({
            client: "memcache"
        });
        
        rediscache_Obj = cache.initialize({
            client: "redis"
        });

        console.log("init");

    });

    after(function() {

    });

    it("setAndGetLocalCache", function() {
        return local_cacheObj.set("local-abc", "local-bcd").then(function() {
            return local_cacheObj.get("local-abc").then(function (val) {
                assert.ok(val, "local-bcd");
            });
        });
    });

    it("removeLocalCache", function() {
        return local_cacheObj.set("local-abc", "local-bcd").then(function() {
            return local_cacheObj.remove("local-abc").then(function() {
                return local_cacheObj.get("local-abc").then(function(val) {
                    assert.notOk(val, "local-abc");
                });
            });
        });
    });

    it("getAndGetBatchLocalCache", function() {
        return local_cacheObj.set("local-abc", "local-bcd").then(function() {
            return local_cacheObj.set("local-efg", "local-hij").then(function () {
                return local_cacheObj.getBatch(["local-abc", "local-efg"]).then(function (vals) {
                    assert.ok(vals, {"local-abc": "local-bcd", "local-efg": "local-hij"});
                });
            });
        });
    });

    it("removeBatchLocalCache", function() {
        return local_cacheObj.set("local-abc", "local-bcd").then(function() {
            return local_cacheObj.set("local-efg", "local-hij").then(function () {
                return local_cacheObj.removeBatch(["local-abc", "local-efg"]).then(function() {
                    return local_cacheObj.getBatch(["local-abc", "local-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

    it("removeAllLocalCache", function() {
        return local_cacheObj.set("local-abc", "local-bcd").then(function() {
            return local_cacheObj.set("local-efg", "local-hij").then(function () {
                return local_cacheObj.removeAll(["local-abc", "local-efg"]).then(function() {
                    return local_cacheObj.getBatch(["local-abc", "local-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

    it("setAndGetMemCache", function() {
        return memcache_Obj.set("mem-abc", "mem-bcd").then(function() {
            return memcache_Obj.get("mem-abc").then(function (val) {
                assert.ok(val, "mem-bcd");
            });
        });
    });

    it("removeMemCache", function() {
        return memcache_Obj.set("mem-abc", "mem-bcd").then(function() {
            return memcache_Obj.remove("mem-abc").then(function() {
                return memcache_Obj.get("mem-abc").then(function(val) {
                    assert.notOk(val, "mem-bcd");
                });
            });
        });
    });

    it("getAndGetBatchMemCache", function() {
        return memcache_Obj.set("mem-abc", "mem-bcd").then(function() {
            return memcache_Obj.set("mem-efg", "mem-hij").then(function () {
                return memcache_Obj.getBatch(["mem-abc", "mem-efg"]).then(function (vals) {
                    assert.ok(vals, {"mem-abc": 'mem-bcd', "mem-efg": 'mem-hij'});
                });
            });
        });
    });

    it("removeBatchMemCache", function() {
        return memcache_Obj.set("mem-abc", "mem-bcd").then(function() {
            return memcache_Obj.set("mem-efg", "mem-hij").then(function () {
                return memcache_Obj.removeBatch(["mem-abc", "mem-efg"]).then(function() {
                    return memcache_Obj.getBatch(["mem-abc", "mem-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

    it("removeAllMemCache", function() {
        return memcache_Obj.set("mem-abc", "mem-bcd").then(function() {
            return memcache_Obj.set("mem-efg", "mem-hij").then(function () {
                return memcache_Obj.removeAll(["mem-abc", "mem-efg"]).then(function() {
                    return memcache_Obj.getBatch(["mem-abc", "mem-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

    it("setAndGetRedisCache", function() {
        return rediscache_Obj.set("Redis-abc", "Redis-bcd").then(function() {
            return rediscache_Obj.get("Redis-abc").then(function (val) {
                assert.ok(val, "Redis-bcd");
            });
        });
    });

    it("removeRedisCache", function() {
        return rediscache_Obj.set("Redis-abc", "Redis-bcd").then(function() {
            return rediscache_Obj.remove("Redis-abc").then(function() {
                return rediscache_Obj.get("Redis-abc").then(function(val) {
                    assert.notOk(val, "Redis-bcd");
                });
            });
        });
    });

    it("getAndGetBatchRedisCache", function() {
        return rediscache_Obj.set("Redis-abc", "Redis-bcd").then(function() {
            return rediscache_Obj.set("Redis-efg", "Redis-hij").then(function () {
                return rediscache_Obj.getBatch(["Redis-abc", "Redis-efg"]).then(function (vals) {
                    assert.ok(vals, {"Redis-abc": 'Redis-bcd', "Redis-efg": 'Redis-hij'});
                });
            });
        });
    });

    it("removeBatchRedisCache", function() {
        return rediscache_Obj.set("Redis-abc", "Redis-bcd").then(function() {
            return rediscache_Obj.set("Redis-efg", "Redis-hij").then(function () {
                return rediscache_Obj.removeBatch(["Redis-abc", "Redis-efg"]).then(function() {
                    return rediscache_Obj.getBatch(["Redis-abc", "Redis-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

    it("removeAllRedisCache", function() {
        return rediscache_Obj.set("Redis-abc", "Redis-bcd").then(function() {
            return rediscache_Obj.set("Redis-efg", "Redis-hij").then(function () {
                return rediscache_Obj.removeAll(["Redis-abc", "Redis-efg"]).then(function() {
                    return rediscache_Obj.getBatch(["Redis-abc", "Redis-efg"]).then(function (vals) {
                        assert.ok(vals, {});
                    });
                });
            });
        });
    });

});
