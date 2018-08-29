var TIME_EXPIRATION = 1000 * 30;
var CACHE = {};

var toString = function (arg) {
    return typeof arg === 'string' ? arg : JSON.stringify(arg)
};

var keyFromArgs = function (args) {
    var id = toString(args[0]);
    if (args[1] && args.length >= 3) {
        id += '_' + toString(args[1]);
    }
    return id;
};

var clearCache = function () {
    for (var key in CACHE) {
        if (CACHE[key]) {
            delete CACHE[key];
        }
    }
};

module.exports = function VuexCachePlugin(configTimeExpiration) {
    TIME_EXPIRATION = configTimeExpiration || TIME_EXPIRATION;
    return function (store) {
        var backupDispatchFn = store.dispatch;
        store.dispatch = function () {
            // Spread Operator Alternative (...args)
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            // END Spread Operator Alternative
            var vuexDispatchCacheConfig = args[args.length - 1];
            if (vuexDispatchCacheConfig.enableVuexCachePlugin) {
                if (vuexDispatchCacheConfig.clearAllCache) {
                    clearCache();
                }
                var KEY = keyFromArgs(args);
                if (!CACHE[KEY] || vuexDispatchCacheConfig.forceRefreshCache) {
                    CACHE[KEY] = {
                        data: backupDispatchFn.apply(store, args),
                        timestamp: new Date().getTime(),
                        timeExpiration: vuexDispatchCacheConfig.timeExpiration || TIME_EXPIRATION,
                    };
                    return CACHE[KEY].data;
                } else {
                    var dataCache = CACHE[KEY];
                    if (dataCache.timestamp > new Date().getTime() - dataCache.timeExpiration) {
                        return dataCache.data;
                    } else {
                        CACHE[KEY] = {
                            data: backupDispatchFn.apply(store, args),
                            timestamp: new Date().getTime(),
                            timeExpiration: vuexDispatchCacheConfig.timeExpiration || TIME_EXPIRATION,
                        };
                        return CACHE[KEY].data;
                    }
                }
            } else {
                backupDispatchFn.apply(store, args);
            }
        };
    };
}
