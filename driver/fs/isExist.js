define(function(require,exports,module){
    
    var exists = require('fs').existsSync;
    
    module.exports = exists;
});