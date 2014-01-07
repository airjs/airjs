define(function(require,exports,module){
    var global = require('../../driver/global');
    var on = require('../event/on');
    var delegateList = require('./delegateList');
    var attr = require('./attr');

    var getDlgElement = function(ele){
          if(!ele) return null;
          return ele.getAttribute && (!!attr(ele,"data-qiyi-delegate") || !!attr(ele,"data-delegate") || !!attr(ele,"j-delegate") || !!attr(ele,"j-dlg")) ? ele : getDlgElement(ele.parentNode);
    }
    var delegate = function (element,delegate, callback, evt, that) {
        if (!delegate) return;
        callback = callback || function () { };
        evt = evt || "click";
        var fn = function (e) {
            e = global.event || e;
            var target = e.target || e.srcElement;
            target = getDlgElement(target);
            if(target){
                var attribute = attr(target,"data-qiyi-delegate")|| attr(target,"data-delegate") || attr(target,"j-delegate") || attr(target,"j-dlg");
                if (attribute && attribute == delegate) {
                    callback.call(that, {
                        target: target,
                        event: e
                    });
                    return;
                }
            }
        };
        delegateList.push([callback, fn]);
        on(element,evt, fn);
    };

    module.exports = delegate;
});