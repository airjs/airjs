define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(fd){
        try{
            return fs.closeSync(fd);
        }
        catch(e){
            throw e;
        }
    };
});