define(function(require,exports,module){

    /**
     * Checks whather the object structure is sealed with Object.seal or Object.freeze
     * methods. Because the implementation of these methods is impossible in ECMAScript 3,
     * this method always returns false.
     * ECMAScript 5 Reference: 15.2.3.11
     * @param {object} obj an object to examine
     * @returns {boolean} always false
     * @throws {TypeError} when obj is not an object
     */
    Object.isSealed || ( Object.isSealed = function(obj){ 
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        if( !__isObject(obj) ) 
            throw new TypeError( obj+" is not an object" );
        return false; 
    });

});