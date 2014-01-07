define(function(require,exports,module){
    
    var stopPropagation = require('./stopPropagation');
    var preventDefault = require('./preventDefault');

    var stop = function (event) {
        stopPropagation(event);
        preventDefault(event);
    };

    module.exports = stop;
});