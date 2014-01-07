define(function(require,exports,module){
    
    var setRaw = require('./setRaw');

    var set = function (key, value, options) {
        setRaw(key, encodeURIComponent(value), options);
    };

    module.exports = set;
});