define(function(require,exports,module){
    
    var _sibling = require('./sibling');
    
    var last = function(el){
        return _sibling(el, 'previousSibling', 'lastChild');
    }
    
    module.exports = last;
});