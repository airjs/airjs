define(function(require,exports,module){
    
    var close = require('../../driver/fs/close');
    
    module.exports = function(fd){
        return close(fd);
    };
});