define(function(require,exports,module){
    
    var _listeners = require('./lists');
    var _ua = require('../browser/ua');

    var lists = _listeners.domListeners;
    var un = function (element, type, listener) {
        type = type.replace(/^on/i, '');
        type = type.replace('mousewheel',(_ua.ff ? 'DOMMouseScroll' : 'mousewheel'));
        
        var len = lists.length,
            isRemoveAll = !listener,
            item,
            realType, realListener;
            
        while (len--) {
            item = lists[len];
            
            if (item[1] === type
                && item[0] === element
                && (isRemoveAll || item[2] === listener)) {
                realType = item[4];
                realListener = item[3];
                if (element.removeEventListener) {
                    element.removeEventListener(realType, realListener, false);
                } else if (element.detachEvent) {
                    element.detachEvent('on' + realType, realListener);
                }
                lists.splice(len, 1);
            }
        }
        return element;
    };

    module.exports = un;
});