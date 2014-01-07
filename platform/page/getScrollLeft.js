define(function(require,exports,module){

    var global = require('../../driver/global');

    var getScrollLeft = function(){
        var context = global;
        var doc = context.document;
        // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
        var de = doc.documentElement;
        // If the pageXOffset of the browser is available, use that
        return context.pageXOffset ||
        // Otherwise, try to get the scroll left off of the root node
        (de && de.scrollLeft) ||
        // Finally, try to get the scroll left off of the body element
        doc.body.scrollLeft;
    };

    module.exports = getScrollLeft;
});