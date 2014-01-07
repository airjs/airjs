define(function(require,exports,module){
    var un = require('../event/un');
    var delegateList = require('./delegateList');

    var undelegate = function (element,delegate, callback, evt) {
        if (!delegate) return;
        var fn = null,evt = evt || "click";
        var list = delegateList, len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i][0] === callback) {
                fn = list[i][1];
            }
        }
        if (!fn) return;
        un(element,evt, fn);
    };
    
    module.exports = undelegate;

    
});