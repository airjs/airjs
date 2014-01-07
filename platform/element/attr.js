define(function(require,exports,module){
    
    var attr = function (element, key, value) {
        if(arguments.length == 2){
            //document对象没有getAttribute方法
            if(element.getAttribute){
                return element.getAttribute(key) || element[key] || undefined;
            }
        }
        else if(arguments.length == 3){
            element.setAttribute(key,value);
        }
    };
    
    module.exports = attr;
});