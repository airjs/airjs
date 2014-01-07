define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(path, flags, mode){
        try{
            return fs.openSync(path, flags, mode);
        }
        catch(e){
            throw e;
        }
    };
});