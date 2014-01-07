define(function(require,exports,module){
    
    var addClass = function (el,value) {
		var classNames, i, l, setClass;

		if ( value && typeof value === "string" ) {
			classNames = value.split(/\s+/);
            if (el.nodeType === 1) {
                if (!el.className && classNames.length === 1) {
                    el.className = value;
                } 
                else {
                    setClass = " " + el.className + " ";
                    for (i = 0, l = classNames.length; i < l; i++) {
                        if (!~setClass.indexOf( " " + classNames[i] + " " )) {
                            setClass += classNames[i] + " ";
                        }
                    }
                    el.className = setClass.trim();
                }
            }
		}
    };
    
    module.exports = addClass;
});