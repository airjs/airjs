define(function(require,exports,module){
    
    var _listeners = require('./lists');
    
    var lists = _listeners.customListeners;
    var ceon = function (element, type, listener) {
        type = type.replace(/^on/i, '');

        var realListener = function (ev) {
                listener(ev);
        };
        type = type.toLowerCase();
        lists[type] = lists[type] || [];
        lists[type].push({
            type:type,
            listener:listener,
            realListener:realListener
        });
        return element;
    };
    
    module.exports = ceon;
});