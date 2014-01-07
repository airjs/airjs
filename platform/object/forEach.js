define(function(require,exports,module){

    var forEach = function (source, iterator) {
        var returnValue, key, item; 
        if ('function' == typeof iterator) {
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    item = source[key];
                    returnValue = iterator.call(source, item, key);
            
                    if (returnValue === false) {
                        break;
                    }
                }
            }
        }
        return source;
    };
    
    module.exports = forEach;
});