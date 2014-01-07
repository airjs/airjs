define(function(require,exports,module){

    var _isArray = require('../array/isArray');
    var _forEach = require('../object/forEach');
    var _escapeSymbol = require('./escapeSymbol');

    var jsonToQuery = function (json, replacer_opt) {
        var result = [],
            itemLen,
            replacer = replacer_opt || function (value) {
                return _escapeSymbol(value);
            };
            
        _forEach(json, function(item, key){
            if (_isArray(item)) {
                itemLen = item.length;
                while (itemLen--) {
                    result.push(key + '=' + replacer(item[itemLen], key));
                }
            } else {
                result.push(key + '=' + replacer(item, key));
            }
        });
        
        return result.join('&');
    };
    
    module.exports = jsonToQuery;
});