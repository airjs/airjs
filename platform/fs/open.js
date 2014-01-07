define(function(require,exports,module){
    
    var open = require('../../driver/fs/open');
    
    module.exports = function(path, flags, mode){
        return open(path, flags, mode);
    };
});