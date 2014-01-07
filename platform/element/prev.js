define(function(require,exports,module){
    
    var _sibling = require('./sibling');
    
    var prev = function(el){
        return _sibling(el, 'previousSibling', 'previousSibling');
    }
    
    module.exports = prev;
});