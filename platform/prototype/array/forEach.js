define(function(require,exports,module){
    /**
     * Invokes given callback function for each element of an array.
     * ECMAScript 5 Reference: 15.4.4.18
     * @param {function} callback a callback
     * @throws {TypeError} when callback is not callable object
     * @example [1,2,3].forEach(function(el){ console.log(el); });
     */
    if (!Array.prototype.forEach){
        Array.prototype.forEach = function(callback, thisArg){
            var T, k;
            if (this == null) {
                throw new TypeError("this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if ({}.toString.call(callback) != "[object Function]"){
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg){
                T = thisArg;
            }
            k = 0;
            while(k < len){
                var kValue;
                if (k in O){
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    };
});