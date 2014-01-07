define(function(require,exports,module){
    
    var readFile = require('../../driver/fs/readFile');
    
    module.exports = function(){
        return readFile.apply(null,arguments).toString();
    };
});