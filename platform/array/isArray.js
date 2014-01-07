define(function(require,exports,module){
    
    var isArray = Array.isArray || function(arg){
        return Object.prototype.toString.call(arg) == '[object Array]';
    }

    module.exports = isArray;
    
});