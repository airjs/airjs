define(function(require,exports,module){

    /**
     * Returns a prototype of an object. In this implementation the method tries to
     * use __proto__ attribute (for Spider/Trace-Monkey and Rhino) or constructor.prototype
     * reference which won't work for the overriden constructor property
     * ECMAScript 5 Reference: 15.2.3.2
     * @param obj {object} 
     * @returns {object} Object's prototype
     * @example Object.getPrototypeOf([]) === Array.prototype;
     */
    if( !Object.getPrototypeOf ) {
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        if( "".__proto__ ) {
            Object.getPrototypeOf = function(obj) {
                if( !__isObject(obj) ) 
                    throw new TypeError( obj + " is not an object" );
                return obj.__proto__;
            };
        } else {
            Object.getPrototypeOf = function(obj) {
                if( !__isObject(obj) ) 
                    throw new TypeError( obj + " is not an object" );
                return obj.constructor ? obj.constructor.prototype : null;
            };
        }
    }

});