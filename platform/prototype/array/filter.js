define(function(require,exports,module){
    /**
     * Invokes callback for each element of an array (starting from first one)
     * and returns array of those elements for which the callback returned true.
     * ECMAScript 5 Reference: 15.4.4.20
     * @param {function} callback a callback
     * @return {Array} an array of results
     * @throws {TypeError} when callback is not callable object
     * @example var odds = [1,2,3,4].filter(function(n){return n & 1; });
     */
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(fun) {
            if (this == null) throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function") throw new TypeError();
            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i]; // in case fun mutates this  
                    if (fun.call(thisp, val, i, t)) res.push(val);
                }
            }
            return res;
        };
    }
});