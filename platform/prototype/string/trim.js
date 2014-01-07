define(function(require,exports,module){
    /**
     * Trims left and right side of the string. Method removes spaces, tabulators
     * and new line characters.
     * Method implements probably the fastest algorithm of JavaScript trim operation
     * (see http://blog.stevenlevithan.com/archives/faster-trim-javascript)
     * ECMAScript 5 Reference: 15.5.4.20
     * @returns {string} trimmed string
     */
    String.prototype.trim || (String.prototype.trim = function(){
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    });

});