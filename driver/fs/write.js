define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(fd, str, position, encoding){
        try{
            return fs.writeSync(fd, str, position, encoding);
        }
        catch(e){
            throw e;
        }
    };
});