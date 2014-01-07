define(function(require,exports,module){
    /**
     * If given callback returns true for all elements of the array, the method
     * itself returns true as well; false otherwise. 
     * ECMAScript 5 Reference: 15.4.4.16
     * @param {function} callback a callback
     * @returns {boolean} true when callback returns true for all elements of 
     *          the array; false otherwise 
     * @throws {TypeError} when callback is not callable object
     * @see Array.prototype.some
     * @example var allEven = array.every(function(el){
     *              return !(el & 1);
     *          });
     */
    if (!Array.prototype.every) {
        Array.prototype.every = function(fun) {
            if (this == null) throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function") throw new TypeError();
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t && !fun.call(thisp, t[i], i, t)) return false;
            }
            return true;
        };
    }

});