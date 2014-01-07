define(function(require,exports,module){
    var fs = require('fs');
    module.exports = function(filepath){
        var stat = fs.statSync(filepath);
        return (stat && stat.size) || -1;
    };
});