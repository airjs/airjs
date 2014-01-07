define(function(require,exports,module){
    
    var _sizzle = require('../selector/sizzle');
    
    var down = function(context,selector){
        var res = _sizzle(selector,context);
        if(!res)return null;
		return res;
    }
    
    module.exports = down;
});