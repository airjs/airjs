define(function(require,exports,module){
    
    var isValidKey = require('./isValidKey');

    var getRaw = function (key) {
        if (isValidKey(key)) {
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                result = reg.exec(document.cookie);
            if (result) {
                return result[2] || null;
            }
        }

        return null;
    };

    module.exports = getRaw;
});