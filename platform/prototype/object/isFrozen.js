define(function(require,exports,module){

    /**
     * Checks whether the object have been frozen with Object.freeze method.
     * Because the implementation of Object.freeze is impossible with ECMAScript 3 features,
     * the method always returns false.
     * ECMAScript 5 Reference: 15.2.3.12
     * @param {object} obj an object to examine
     * @returns {boolean} always false
     * @throws {TypeError} when obj is not an object
     */ 
    Object.isFrozen || ( Object.isFrozen = function(obj){
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        if( !__isObject(obj) ) 
            throw new TypeError( obj+" is not an object" );
        return false;       
    });

});