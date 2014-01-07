define(function(require,exports,module){
    
    var _listeners = require('./lists');
    var _ua = require('../browser/ua');
    
    var lists = _listeners.domListeners;
    var on = function (element, type, listener) {
        type = type.replace(/^on/i, '');
        type = type.replace('mousewheel',(_ua.ff ? 'DOMMouseScroll' : 'mousewheel'));

        var realListener = function (ev) {
                //此处不对event对象做包装，是因为无法获知当前事件所在的window对象（iframe中的情况）
                listener.call(element, ev);
            },
            realType = type;
        if (element.addEventListener) {
            element.addEventListener(realType, realListener, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + realType, realListener);
        }

        lists[lists.length] = [element, type, listener, realListener, realType];
        return element;
    };

    module.exports = on;
});