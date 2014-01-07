define(function(require,exports,module){

    var fingerMove = require('./fingerMove');
    var fingerSlide = require('./fingerSlide');
    var mouseenter = require('./mouseenter');
    var mouseleave = require('./mouseleave');
    var transitionEnd = require('./transitionEnd');
    var inclick = require('./inclick');

    var listenersTypeList = {
        'fingermove':fingerMove,
        'fingerslide':fingerSlide,
        'mouseenter':mouseenter,
        'mouseleave':mouseleave,
        'transitionend':transitionEnd,
        'inclick': inclick
    }
    
    module.exports = listenersTypeList;
});