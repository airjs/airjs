define(function(require,exports,module){
    var stat = require('./stat');
    module.exports = function(path){
        return stat(path).isFile();
    };
});