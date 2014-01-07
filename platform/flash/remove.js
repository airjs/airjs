define(function(require,exports,module){

    var _list = require('./list');
    var _ua = require('../browser/ua');

    var remove = function(id){
        var obj = _list.get(id);
        if(obj && obj.nodeName.toLowerCase() == "object"){
            obj.style.display = "none";
            if (_ua.IE) {
                (function(){
                    if (obj.readyState == 4 || obj.readyState == "complete") {
                        for (var i in obj) {
                            if (typeof obj[i] == "function") {
                                obj[i] = null;
                            }
                        }
                        _list.remove(id);
                        obj.parentNode.removeChild(obj);
                    }
                    else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            else {
                _list.remove(id);
                obj.parentNode.removeChild(obj);
            }
        }
    }

    module.exports = remove;
});