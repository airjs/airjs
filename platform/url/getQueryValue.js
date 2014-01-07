define(function(require,exports,module){

    var _escapeReg = require('../string/escapeReg');

    var getQueryValue = function (url, key) {
        var reg = new RegExp(
                            "(^|&|\\?|#)" 
                            + _escapeReg(key) 
                            + "=([^&#]*)(&|\x24|#)", 
                        "");
        var match = url.match(reg);
        if (match) {
            return match[2];
        }
        
        return '';
    };
    
    module.exports = getQueryValue;
});