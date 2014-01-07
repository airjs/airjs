define(function(require,exports,module){

    /**
     * Reduces an array to a single value. The callback is executed for each
     * element of an array starting from the first one. First argument of the
     * callback takes the result of previous callback invocation. For the first 
     * invocation either first element of an array is taken or the last (optional)
     * argument of the reduce method.
     * ECMAScript 5 Reference: 15.4.4.21
     * @param {function} callback a callback object
     * @returns {any} value of reduce algorithm; single value
     * @throws {TypeError} when callback is not a callable object
     * @see Array.prototype.reduceRight
     * @example var sum=[1,2,3].reduce(function(s,v){return s+v;}); 
     */
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function reduce(accumulator) {
            if (this === null || this === undefined) throw new TypeError("Object is null or undefined");
            var i = 0,
                l = this.length >> 0,
                curr;
            if (typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."  
            throw new TypeError("First argument is not callable");

            if (arguments.length < 2) {
                if (l === 0) throw new TypeError("Array length is 0 and no second argument");
                curr = this[0];
                i = 1; // start accumulating at the second element  
            } else curr = arguments[1];
            while (i < l) {
                if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
                ++i;
            }

            return curr;
        };
    }
    
});