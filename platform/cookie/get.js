define(function(require,exports,module){
    
    var getRaw = require('./getRaw');

    var get = function (key) {
        var value = getRaw(key);
        if ('string' == typeof value) {
            value = decodeURIComponent(value);
            return value;
        }
        return null;
    };

    module.exports = get;
});