define(function(require, exports, module) {
    /**
     * ECMAScript 5 Reference: 15.4.4.14
     * According to specification Array.prototype.indexOf.length is 1
     * @param searchElement -
     * @param fromIndex {number} - start index (optional)
     * @returns {number} index of found element or -1
     * @example ['a','b','c'].indexOf('b') === 1;
     */
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement) {
            var len = this.length,
                i = +arguments[1] || 0; // fromIndex
            if(len === 0 || isNaN(i) || i >= len) return -1;

            if(i < 0) {
                i = len + i;
                i < 0 && (i = 0);
            }

            for(; i < len; ++i) {
                if(this[i] === searchElement) return i;
            }

            return -1;
        };
    }
});