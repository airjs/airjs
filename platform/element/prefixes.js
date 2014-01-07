define(function(require,exports,module){
	var testBrowser = {
	        // Browser vendor CSS prefixes
	        browserVendors: ['', '-webkit-', '-moz-', '-ms-', '-o-', '-khtml-']

	        // Browser vendor DOM prefixes
	        ,domPrefixes: ['', 'Webkit', 'Moz', 'ms', 'O', 'Khtml']

	        // Method to iterate over a property (using all DOM prefixes)
	        // Returns true if prop is recognised by browser (else returns false)
	        ,testDom: function (prop) {
	            var i = this.domPrefixes.length;
	            while (i--) {
	                if (document.body.style[this.domPrefixes[i] + prop] !== undefined) {
	                    return true;
	                }
	            }

	            return false;
	        }

	        ,cssTransitions: function () {
	            // Use Modernizr if available & implements csstransitions test
	            if (window.Modernizr && Modernizr.csstransitions !== undefined) {
	                return Modernizr.csstransitions;
	            }

	            // Use testDom method to check prop (returns bool)
	            return this.testDom('Transition');
	        }

	        ,cssTransforms3d: function () {
	            // Use Modernizr if available & implements csstransforms3d test
	            if (window.Modernizr && Modernizr.csstransforms3d !== undefined) {
	                return Modernizr.csstransforms3d;
	            }

	            // Check for vendor-less prop
	            if (document.body.style['perspectiveProperty'] !== undefined) {
	                return true;
	            }

	            // Use testDom method to check prop (returns bool)
	            return this.testDom('Perspective');
	        }
	    };

		// CSS vendor prefix generator
		//TODO
	 var prefixes = function (el,props) {
			
	        var output = [];
	        // Loop through props, add with each vendor prefix to output array
	        for (var prop in props) {
	            if(props.hasOwnProperty(prop)) {
	                var i = testBrowser.browserVendors.length;
	                while (i--) {
	                    output[testBrowser.browserVendors[i] + prop] = props[prop];
	                    el.css(testBrowser.browserVendors[i] + prop,props[prop]);
	                }
	                
	            }
	        }
	    };
	    
    module.exports = prefixes;
});