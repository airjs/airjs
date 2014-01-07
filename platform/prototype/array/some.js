define(function(require,exports,module){
    /**
     * When callback returns true for at least one element of the array, then
     * the Array.prototype.some method returns true as well; false otherwise.
     * ECMAScript 5 Reference: 15.4.4.17
     * @param {function} callback a callback
     * @returns {boolean} true when the callback returns true for at least one
     *          array element
     * @throws {TypeError} when callback is not callable object
     * @see Array.prototype.every
     * @example var containsNull = array.some(function(el){ return el===null });
     */
    if (!Array.prototype.some) {
        Array.prototype.some = function(fun) {
            if (this == null) throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function") throw new TypeError();
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisp, t[i], i, t)) return true;
            }
            return false;
        };
    }
    
});