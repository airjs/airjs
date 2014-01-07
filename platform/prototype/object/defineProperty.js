define(function(require,exports,module){

    if( !Object.defineProperty ) {
        /**
         * Implementation of IsCallable internal ECMAScript function.
         * ECMAScript 5 reference: 9.11
         * @private
         * @param {object} obj An object to examine
         * @returns {boolean} true if object is callable false otherwise
         */
        var __isCallable = (function(){ 
            
            var __sortCase = (function(){
                    try {
                        [].sort('abc');
                        return false;
                    } catch(ex) {
                        return true;
                    }
                })();
            
            return function(obj){
                if( typeof obj === 'function' )
                    return true;
                if( typeof obj !== 'object' ) 
                    return false;
                if( obj instanceof Function || obj instanceof RegExp )
                    return true;
                if( __sortCase ) {
                    try {
                        [].sort(obj);
                        return true;
                    } catch(ex){ /* nothing to do */ }
                }
                return false;
            };
        })();
        /**
         * Implementation of ToPropertyDescriptor inner ECMAScript 5 method.
         * ECMAScript 5 reference: 8.10.5
         * @private
         * @param {Object} obj a property object
         * @returns {Object} a property descriptor
         */
        var __toPropertyDescriptor = function(obj){
            if( !obj || typeof obj !== 'object' )
                throw new TypeError( obj+" is not an object" );
            
            var desc = {};
            obj.hasOwnProperty("enumerable") && ( desc.enumerable = !!obj.enumerable );
            obj.hasOwnProperty("configurable") && ( desc.configurable = !!obj.configurable );
            obj.hasOwnProperty("writable") && ( desc.writable = !!obj.writable );
            obj.hasOwnProperty("value") && ( desc.value = obj.value );
            
            if( obj.hasOwnProperty("get") ) {
                if( !__isCallable(obj.get) && typeof obj.get !== 'undefined' )
                    throw new TypeError( "Getter must be a callable object" );
                desc.get = obj.get;
            }
            
            if( obj.hasOwnProperty("set") ) {
                if( !__isCallable(obj.set) && typeof obj.set !== 'undefined' )
                    throw new TypeError( "Setter must be a callable object" );
                desc.set = obj.set;
            }       
            
            if( (desc.hasOwnProperty("get") || desc.hasOwnProperty("set")) 
                    && (desc.hasOwnProperty("writable") || desc.hasOwnProperty("value")) ) {
                throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
            }

            return desc;        
        };
        /**
         * Internal method of this library which checks additional conditions in property descriptor object
         * in order to limitations in ECMAScript 3. Should be called on a result of __toPropertyDescriptor 
         * internal function.
         * @private
         * @param {Object} desc a property descriptor
         * @param {boolean} defaultValue the default value of not provided flags
         * @param value the value of a property
         * @returns {Object} property descriptor with applied defaults and value 
         * @see __toPropertyDescriptor
         */
        var __applyDefaults = function(desc, defaultValue, value) {
            if(desc.hasOwnProperty("get") || desc.hasOwnProperty("set")) {
                throw new TypeError( "Getters and setters are not supported by this ECMAScript engine" );
            } else {
                desc.writable = desc.hasOwnProperty('writable') ? desc.writable : defaultValue;
                desc.value = desc.hasOwnProperty('value') ? desc.value : value;
            }
            
            desc.enumerable = desc.hasOwnProperty('enumerable') ? desc.enumerable : defaultValue;
            desc.configurable = desc.hasOwnProperty('configurable') ? desc.configurable : defaultValue;
            
            var t = null;
            if( (!desc[t="configurable"]) || (!desc[t="enumerable"]) || (!desc[t="writable"]) ) {
                throw new TypeError( "Property '".concat(t,"' cannot be set to false in this version of ECMAScript engine") );
            }       

            return desc;
        };
        /**
         * Creates or redefines a property of an object. The property descriptor can contain one of
         * following attributes: value, writable, configurable, enumerable, get, set.
         * Get and set properties can't exist together with value or writable.
         * 
         * WARNING! The full implementation of defineProperty method is impossible with ECMAScript 3
         * features. In particular ECMAScript 3 does not allow to make properties non-enumerable, 
         * non-configurable or read only. As a consequence when at least on of these flags (enumerable,
         * configurable or writable) is set to false, the library will throw an Error.  
         * Also accessors (getters and setters) are not a part of ECMAScript 3 and as such they are not
         * supported by this library. 
         *  
         * ECMAScript 5 Reference: 15.2.3.6
         * @since 1.2
         * @param {Object} obj an object
         * @param {string} property a property name
         * @param {Object} descriptor a property descriptor
         * @returns {Object} obj property modified by property descriptor
         * @throws {TypeError} when obj or descriptor is not an object or when property descriptor is 
         *          incorrect (i.e. contains both getter and value)
         * @example Object.defineProperty(myObj, "testValue", {
         *              value:1, enumerable:true, writable:true, configurable:true});
         */
        Object.defineProperty = function(obj, property, descriptor){
            if( !__isObject(obj) ) 
                throw new TypeError( obj+" is not an object" );
            
            var pname = String(property);
            var desc = __toPropertyDescriptor(descriptor);
            desc = __applyDefaults( desc, obj.hasOwnProperty(pname), obj[pname] );
            
            obj[pname] = desc.value;
            
            return obj;
        };
        
        Object.defineProperty.DDRECMA5 = true;
    }

});