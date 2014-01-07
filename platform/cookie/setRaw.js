define(function(require,exports,module){
    
    var isValidKey = require('./isValidKey');

    var setRaw = function (key, value, options) {
        if (!isValidKey(key)) {
            return;
        }
        
        options = options || {};
        var expires = options.expires;
        if ('number' == typeof options.expires) {
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires);
        }
        
        document.cookie =
            key + "=" + value
            + (options.path ? "; path=" + options.path : "")
            + (expires ? "; expires=" + expires.toGMTString() : "")
            + (options.domain ? "; domain=" + options.domain : "")
            + (options.secure ? "; secure" : ''); 
    };

    module.exports = setRaw;
});