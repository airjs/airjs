define(function(require,exports,module){

    /**
     * Returns property descriptor for property of a given object
     * ECMAScript 5 Reference: 15.2.3.3
     * @since 1.2
     * @param {object} obj an object
     * @param {string} pname property name to test; when it doesn't point to a valid property name
     *          the method return undefined
     * @returns {object} property descriptor or undefined
     * @throws {TypeError} when obj is null or not an object
     * @example Object.getOwnPropertyDescriptor(Array.prototype, "length");
     */
    Object.getOwnPropertyDescriptor || ( Object.getOwnPropertyDescriptor = (function(){
        
        var __NUMBER_CONSTS = ['MAX_VALUE', 'MIN_VALUE','NaN','POSITIVE_INFINITY','NEGATIVE_INFINITY'],
            __MATH_CONSTS = ['PI','E','LN2','LOG2E','LOG10E','SQRT1_2','SQRT2'];
        var __isObject = function(obj) {
            return obj && ( typeof obj === 'object' || typeof obj === 'function' );
        };
        var __propertyIsEnumerable = function(obj, property) {
            if( obj.propertyIsEnumerable ) {
                return obj.propertyIsEnumerable(property);
            }
            for(var key in obj) {
                if( key === property && (obj.hasOwnProperty ? obj.hasOwnProperty(property) : true) ){
                    return true;
                }
            }
            return false;
        };
        
        return function(obj, pname){
            if( !__isObject(obj) ) 
                throw new TypeError( obj+" is not an object" );
            
            if( !(pname in obj) )
                return;
            
            var editable = true,
                configurable = true;
            
            // recognize the only cases when ECMAScript 3 protects properties
            if( (obj===Number && __NUMBER_CONSTS.indexOf(pname)>=0) 
                    || (obj===Math && __MATH_CONSTS.indexOf(pname)>=0) 
                    || (pname=='length' && (obj===String.prototype || __isString(obj) 
                            || obj===Function.prototype || obj instanceof Function)) ) {
                editable = false;
                configurable = false;
            } else if( pname=='length' && (obj===Array.prototype || Array.isArray(obj)) ) {
                configurable = false;
            } 
            
            return {
                writable: editable,
                enumerable: __propertyIsEnumerable(obj,pname),
                configurable: configurable,
                value: obj[pname]
            };
        };
    })());  

});