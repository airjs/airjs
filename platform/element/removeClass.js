define(function(require,exports,module){
    
    var removeClass = function (el,value) {
		var classNames, className, i, l;

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = (value || "").split(/\s+/);

            if (el.nodeType === 1 && el.className) {
                if (value) {
                    className = (" " + el.className + " ").replace(/[\n\t\r]/g," ");
                    for (i = 0, l = classNames.length; i < l; i++ ) {
                        className = className.replace(" " + classNames[i] + " ", " ");
                    }
                    el.className = className.trim();
                }
                else {
                    el.className = "";
                }
            }
		}
    };
    
    module.exports = removeClass;
});