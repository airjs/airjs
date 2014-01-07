define(function(require, exports, module) {
    /**
     * Binds the function to a context and returns a wrapper function.
     * Practically it 'converts' a method to a function with remembering 
     * the context.
     * ECMAScript 5 Reference: 15.3.4.5
     * @param ctx {object} method's context
     * @returns {function} wrapped function
     * @example var flatFunction = obj.method.bind(obj);
     */
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function  
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	}

});
