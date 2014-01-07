define(function(require,exports,module){
    
    var isObject = function(arg){
        return Object.prototype.toString.call(arg) == '[object Object]';
    }
    
    module.exports = isObject;
});