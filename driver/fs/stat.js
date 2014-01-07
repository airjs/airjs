define(function(require,exports,module){
    var statSync = require('fs').statSync;
    module.exports = statSync;
});