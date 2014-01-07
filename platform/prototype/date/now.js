define(function(require,exports,module){

    /**
     * Numeric representation of current time (in milliseconds)
     * @returns {number} 
     * @example var timestamp = Date.now();
     * ECMAScript 5 Reference: 15.9.4.4
     */
    Date.now || (Date.now = function(){
        return +new Date;
    });

});