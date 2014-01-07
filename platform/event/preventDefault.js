define(function(require,exports,module){
    
    var preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } 
        else {
            event.returnValue = false;
        }
        return event;
    };

    module.exports = preventDefault;
});