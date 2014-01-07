define(function(require,exports,module){
    
    var write = require('../../driver/fs/write');
    
    module.exports = function(fd, str, position, encoding){
        return write(fd, str, position, encoding);
    };
});