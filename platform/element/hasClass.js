define(function(require,exports,module){
    
    var hasClass = function (el,selector) {
		var className = " " + selector + " ";
        if (el.nodeType === 1 && (" " + el.className + " ").replace(/[\n\t\r]/g, " ").indexOf( className ) > -1 ) {
            return true;
        }
		return false;
    };
    
    module.exports = hasClass;
});