define(function(require,exports,module){

    var stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } 
        else {
            event.cancelBubble = true;
        }
        return event;
    };

    module.exports = stopPropagation;
});