define(function(require,exports,module){
    
    var appendAsync = require('../../driver/fs/appendAsync');
    
    module.exports = function(filename, data, encoding, callback){
        return appendAsync(filename, data, encoding, callback);
    };
});