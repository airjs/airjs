define(function(require,exports,module){

    var extend = function (target, source, fn) {
    	fn = fn || function(){
    		return true
    	}
        for (var p in source) {
            if (source.hasOwnProperty(p) && fn(target[p],source[p])) {
                target[p] = source[p];
            }
        }
        return target;
    };
    
    module.exports = extend;
});