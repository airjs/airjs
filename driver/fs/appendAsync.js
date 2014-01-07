define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(filename, data, encoding, callback){
        fs.appendFile(filename, data, encoding, callback);
    };
});