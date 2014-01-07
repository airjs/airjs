define(function(require,exports,module){

    /**
     * Checks whether the object structure can be extended. It returns false only when the object has
     * been protected by Object.preventExtensions, Object.seal or Object.freeze methods. 
     * Because in non-ECMAScript 5 interpreters there is not possible to provide such protection,
     * this implementation of Object.isExtensible always returns true. 
     * ECMAScript 5 Reference: 15.2.3.13
     * @param {object} obj an object to examine
     * @returns {boolean} always true
     * @throws {TypeError} when obj is not an object
     */
    Object.isExtensible || ( Object.isExtensible = function(obj){ 
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        if( !__isObject(obj) ) 
            throw new TypeError( obj+" is not an object" );
        return true; 
    }); 

});