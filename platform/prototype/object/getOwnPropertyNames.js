define(function(require,exports,module){

    !Object.getOwnPropertyNames && (function(){
        
        /**
         * Attributes which are marked as non-enumerable by the internal ECMAScript flag.
         * Because in ECMAScript 3 there is not possible to set enumerable flag from the
         * language level - they should be the only non-enumerable elements in the language.
         * (Maybe apart some DOM elements which should be added to this implementation later)
         * @private
         * @type Array
         */
        var __isString = function(obj) {
            return typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object String]';
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
        var __notEnumerableProperties = (function(){
            
            var props = [
                 {
                     object: Object,
                     keys: ['getOwnPropertyNames', 'seal', 'create', 'isFrozen', 'keys', 'isExtensible', 
                            'getOwnPropertyDescriptor', 'preventExtensions', 'getPrototypeOf', 'defineProperty', 'isSealed', 
                            'defineProperties', 'freeze']
                 },{
                     object: Object.prototype,
                     keys: ['toString', '__lookupGetter__', '__defineGetter__', 'toLocaleString', 'hasOwnProperty', 'valueOf', '__defineSetter__', 
                            'propertyIsEnumerable', 'isPrototypeOf', '__lookupSetter__']
                 },{
                     object: Function.prototype,
                     keys: ['bind', 'arguments', 'toString', 'length', 'call', 'name', 'apply', 'caller']
                 },{
                     object: Number,
                     keys: ['NaN', 'NEGATIVE_INFINITY', 'POSITIVE_INFINITY', 'MAX_VALUE', 'MIN_VALUE']
                 },{
                     object: Number.prototype,
                     keys: ['toExponential', 'toString', 'toLocaleString', 'toPrecision', 'valueOf', 'toFixed']
                 },{
                     object: String,
                     keys: ['fromCharCode']
                 },{
                     object: String.prototype,
                     keys: ['length', 'concat', 'localeCompare', 'substring', 'italics', 'charCodeAt', 'strike', 'indexOf', 
                            'toLowerCase', 'trimRight', 'toString', 'toLocaleLowerCase', 'replace', 'toUpperCase', 'fontsize', 'trim', 'split', 
                            'substr', 'sub', 'charAt', 'blink', 'lastIndexOf', 'sup', 'fontcolor', 'valueOf', 'link', 'bold', 'anchor', 'trimLeft', 
                            'small', 'search', 'fixed', 'big', 'match', 'toLocaleUpperCase', 'slice']
                 },{
                     object: Boolean.prototype,
                     keys: ['toString', 'valueOf']
                 },{
                     object: Date,
                     keys: ['now', 'UTC', 'parse']
                 },{
                     object: Date.prototype,
                     keys: ['toUTCString', 'setMinutes', 'setUTCMonth', 'getMilliseconds', 'getTime', 'getMinutes', 'getUTCHours', 
                            'toString', 'setUTCFullYear', 'setMonth', 'getUTCMinutes', 'getUTCDate', 'setSeconds', 'toLocaleDateString', 'getMonth', 
                            'toTimeString', 'toLocaleTimeString', 'setUTCMilliseconds', 'setYear', 'getUTCFullYear', 'getFullYear', 'getTimezoneOffset', 
                            'setDate', 'getUTCMonth', 'getHours', 'toLocaleString', 'toISOString', 'toDateString', 'getUTCSeconds', 'valueOf', 
                            'setUTCMinutes', 'getUTCDay', 'toJSON', 'setUTCDate', 'setUTCSeconds', 'getYear', 'getUTCMilliseconds', 'getDay', 
                            'setFullYear', 'setMilliseconds', 'setTime', 'setHours', 'getSeconds', 'toGMTString', 'getDate', 'setUTCHours']
                 },{
                     object: RegExp,
                     keys:  ['$*', '$`', '$input', '$+', '$&', "$'", '$_']
                 },{
                     object: RegExp.prototype,
                     keys: ['toString', 'exec', 'compile', 'test']
                 },{
                     object: Error.prototype,
                     keys: ['toString']
                 },{
                     object: Math,
                     keys: ['LN10', 'PI', 'E', 'LOG10E', 'SQRT2', 'LOG2E', 'SQRT1_2', 'LN2', 'cos', 'pow', 'log', 'tan', 'sqrt', 'ceil', 'asin', 
                            'abs', 'max', 'exp', 'atan2', 'random', 'round', 'floor', 'acos', 'atan', 'min', 'sin']
                 },{
                     object: global,
                     keys: ['TypeError', 'decodeURI', 'parseFloat', 'Number', 'URIError', 'encodeURIComponent', 'RangeError', 'ReferenceError', 
                            'RegExp', 'Array', 'isNaN', 'Date', 'Infinity', 'Boolean', 'Error', 'NaN', 'String', 'Function', 
                            'Math', 'undefined', 'encodeURI', 'escape', 'unescape', 'decodeURIComponent', 'EvalError', 'SyntaxError', 'Object', 
                            'eval', 'parseInt', 'JSON', 'isFinite']
                 },{
                     test: function(obj){ return typeof JSON !== 'undefined' && obj === JSON; },
                     keys: ['stringify', 'parse']
                 },{
                     test: function(obj){ return Array.isArray(obj) || __isString(obj); },
                     keys: ['length']
                 },{
                     test: function(obj){ return obj instanceof RegExp },
                     testValue: new RegExp('.+'),
                     keys: ['lastIndex', 'multiline', 'global', 'source', 'ignoreCase']
                 },{
                     test: function(obj){ return typeof obj === 'function' && obj.apply && obj.call; },
                     testValue: function(a,b,c){},
                     keys: ['arguments', 'length', 'name', 'prototype', 'caller']
                 }
            ];
            
            for( var i=0, ilen=props.length; i < ilen; ++i){
                if( props[i].object ) {
                    if( typeof props[i].object === 'function' ){
                        props[i].keys.push('arguments', 'length', 'name', 'prototype', 'caller');
                    } else if( typeof props[i].object === 'object' && props[i].object !== Math && props[i].object !== global ) {
                        props[i].keys.push('constructor');
                    }
                    for( var j=props[i].keys.length-1; j>=0; --j ) {
                        if( !(props[i].keys[j] in props[i].object) || __propertyIsEnumerable(props[i].object,props[i].keys[j]) ) {
                            props[i].keys.splice(j,1);
                        }
                    }
                } else if( props[i].test && props[i].testValue && props[i].test(props[i].testValue) ) {
                    for( var j=props[i].keys.length-1; j>=0; --j ) {
                        if( !(props[i].keys[j] in props[i].testValue) || __propertyIsEnumerable(props[i].testValue,props[i].keys[j]) ) {
                            props[i].keys.splice(j,1);
                        }
                    }
                    delete props[i].testValue;
                }
            }
            
            return props;
            
        })(); // __notEnumerableProperties
        
        
        /**
         * Length of non-enumerable properties array
         * @private
         */
        var __len = __notEnumerableProperties.length;
        
        
        /**
         * Returns an array of all direct property names of a given object - including the non-enumerable
         * properties. It makes the difference between this method and Object.keys. 
         * ECMAScript 5 reference: 15.2.3.4
         * @since 1.2
         * @param {Object} obj an object
         * @returns {Array} Array of property names
         * @throws {TypeError} when obj is not an object
         * @see Object#keys
         */
        Object.getOwnPropertyNames = function(obj){
            var keys = Object.keys(obj);
            for(var i=0; i < __len; ++i) {
                if( (__notEnumerableProperties[i].object && __notEnumerableProperties[i].object===obj) 
                        || (__notEnumerableProperties[i].test && __notEnumerableProperties[i].test(obj)) ) {
                    keys = keys.concat( __notEnumerableProperties[i].keys );
                    break;
                }
            }
            return keys;
        };
        
        
    })();

});