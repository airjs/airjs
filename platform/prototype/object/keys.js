define(function(require,exports,module){

    /**
     * Returns an array of object's own property names. It includes only the
     * enumerable properties. For all (enumerable and non-enumerable) properties
     * use Object.getOwnPropertyNames instead. 
     * ECMAScript 5 Reference: 15.2.3.14
     * @param obj {object} 
     * @returns {Array} array of own property names
     * @throws TypeError if the parameter is not an object
     * @example Object.keys({a:5}); // should return ["a"] 
     * @see Object#getOwnPropertyNames
     */  
    Object.keys || (Object.keys = function(obj){

        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        var __isString = function(obj) {
            return typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object String]';
        };
        var __features = {
            STRING_INDEX_ENUMERABLE: "abc".propertyIsEnumerable("1"),
            ACCESSORS: Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__,
            DOM: typeof window === 'object' && typeof document === 'object'
        };
        if( !__isObject(obj) ) 
            throw new TypeError( obj + " is not an object" );
        
        var results = [];
        // key in obj is tricky here, but in IE global object doesn't have hasOwnPropertyMethod
        for(var key in obj) {
            (obj.hasOwnProperty ? obj.hasOwnProperty(key) : key in obj) && results.push(key);
        }
        
        
        if( __isString(obj) && !__features.STRING_INDEX_ENUMERABLE ) {
            for(var i=0, len=obj.length; i < len; ++i) {
                results.push( String(i) );
            }
        }
        
        return results;
    }); 

});