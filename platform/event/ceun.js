define(function(require,exports,module){
    
    var _listeners = require('./lists');
    
    var lists = _listeners.customListeners;
    var ceun = function (element, type, listener) {
        type = type.replace(/^on/i, '').toLowerCase();
        var listeners = lists[type];
        if(listeners){
            var len = listeners.length,
                isRemoveAll = !listener;
            if(listeners && listeners.length > 0){
                if(isRemoveAll == true){
                    lists[type] = [];
                }
                else{
                    listeners.forEach(function(obj,index){
                        if(obj.listener === listener){
                            listeners.splice(index,1);
                        }
                    });
                }
            }
            return element;
        }
    };

    module.exports = ceun;
});