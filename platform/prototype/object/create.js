define(function(require,exports,module){

    /**
     * Creates a new object with given prototype. The constructor of new object will point to its
     * prototype constructor. 
     * 
     * WARNING! When function called with second parameter it internally invokes Object.defineProperties method.
     * The implementation of this method provided in this library is not 100% valid with ECMAScript 5 specification
     * due to some limitations in ECMASCript 3. So in consequence also Object.create suffers from
     * limited functionality. For more details see description of Object.defineProperties method.
     * 
     * ECMAScript 5 Reference: 15.2.3.5
     * @param {object} proto a prototype of new object
     * @param {object} [properties] property descriptions - UNUSED in this implementation!
     * @returns new object with given prototype
     * @throws {TypeError} when proto is not an object
     * @example var newMe = Object.create( {me: 'test'} );
     * @see Object#defineProperties
     */
    Object.create || ( Object.create = (function(){

        /**
         * Moved outside the function to eliminate the closure memory effect
         * @private
         */
        var __TmpConstructor = function(){};
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        
        return function(proto, properties) {
            if( !__isObject(proto) ) 
                throw new TypeError( proto + " is not an object" );
            
            __TmpConstructor.prototype = proto;
            var obj = new __TmpConstructor();
            
            properties && Object.defineProperties( obj, properties );
            
            return obj;
        };
    })());

});