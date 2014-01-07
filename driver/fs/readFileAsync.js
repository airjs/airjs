define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(filePath,/*encoding,*/callback){
        var encoding = 'utf-8';
        if(arguments.length == 3){
            encoding = arguments[1];
            callback = arguments[2];
        }
        fs.readFile(filePath,encoding,callback);
    };
});