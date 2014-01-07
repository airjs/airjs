define(function(require,exports,module){
    var global = require('../../../driver/global');
    global.JSON = global.JSON || {};
    if(!global.JSON.parse){
        global.JSON.parse = function(data){
            return (new Function("return " + data))();
        }
    }
});