define(function(require,exports,module){
    
    var _sizzle = require('../selector/sizzle');
    
    var contains = function(a,b){
		return _sizzle.contains(a,b);
    }
    
    module.exports = contains;
});