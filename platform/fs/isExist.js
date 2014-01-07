define(function(require,exports,module){
    
    var isExist = require('../../driver/fs/isExist');
    
    module.exports = function(path){
        return isExist(path);
    };
});