define(function(require,exports,module){

    var normalize = require('./normalize');

    module.exports = function(path) {
        var isWindows = typeof arguments[arguments.length - 1] == 'boolean' ? arguments[arguments.length - 1] : false;
        var paths = Array.prototype.slice.call(arguments, 0);
        return normalize(paths.filter(function(p, index) {
          return p && typeof p === 'string';
        }).join('/'),isWindows);
    };
});