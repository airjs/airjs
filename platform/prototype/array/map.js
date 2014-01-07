define(function(require,exports,module){

    /**
     * Invokes the callback for each element of an array and return the
     * array of callback results. The result array has the same length as 
     * input array.  
     * ECMAScript 5 Reference: 15.4.4.19
     * @param {function} callback a callback
     * @returns {Array} array of callback results
     * @throws {TypeError} when callback is not a callable object
     * @example var squares = [1,2,3].map(function(n){return n*n;});
     */
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if ({}.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            A = new Array(len);
            k = 0;
            while (k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    kValue = O[k];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[k] = mappedValue;
                }
                k++;
            }
            return A;
        };
    }
});