define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(filePath,data,encoding){
        try{
            return fs.writeFileSync(filePath,data,encoding);
        }
        catch(e){
            throw e;
        }
    };
});