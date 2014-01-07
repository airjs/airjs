define(function(require,exports,module){

    var global = require('../../driver/global');

    var getScrollTop = function(){
        var context = global;
        var doc = context.document;
        // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
        var de = doc.documentElement;
        // If the pageYOffset of the browser is available, use that
        return context.pageYOffset ||
        // Otherwise, try to get the scroll top off of the root node
        (de && de.scrollTop) ||
        // Finally, try to get the scroll top off of the body element
        doc.body.scrollTop;
    };

    module.exports = getScrollTop;
});