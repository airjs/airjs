define(function(require,exports,module){
    
    var setRaw = require('./setRaw');

    var remove = function (key, options) {
        options = options || {};
        options.expires = new Date(0);
        setRaw(key, '', options);
    };

    module.exports = remove;
});