define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(filePath,encoding){
        try{
            return fs.readFileSync(filePath,encoding);
        }
        catch(e){
            throw e;
        }
    };
});