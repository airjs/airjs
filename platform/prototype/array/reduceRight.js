define(function(require, exports, module) {
    /**
     * Works like Array.prototype.reduce, but starts from the end of an array.
     * ECMAScript 5 Reference: 15.4.4.22
     * @param {callable} callback function
     * @returns {any} value of reduce; single value
     * @throws {TypeError} when callback is not a callable object
     * @see Array.prototype.reduce
     * @example [10,20,30].reduceRight(function(a,b){return a-b;}) === 0
     */
    if (!Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function(callbackfn /*, initialValue */ ) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof callbackfn !== "function") {
                throw new TypeError();
            }

            // no value to return if no initial value, empty array
            if (len === 0 && arguments.length === 1) {
                throw new TypeError();
            }

            var k = len - 1;
            var accumulator;
            if (arguments.length >= 2) {
                accumulator = arguments[1];
            } else {
                do {
                    if (k in this) {
                        accumulator = this[k--];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (--k < 0) {
                        throw new TypeError();
                    }
                } while (true);
            }

            while (k >= 0) {
                if (k in t) {
                    accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
                }
                k--;
            }

            return accumulator;
        };
    }

});
