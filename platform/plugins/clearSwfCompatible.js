define(function(require,exports,module){
    var global = require('../../driver/global');
    var _clearSwf = require('./clearSwf');

    global.lib = global.lib || {};
    global.lib.action = global.lib.action || {};
    global.lib.action.ClearSwf = global.lib.action.ClearSwf || {};
    global.lib.action.ClearSwf.get = function(){
        return _clearSwf.get();
    };
    global.lib.action.ClearSwf.load = function(){};
});