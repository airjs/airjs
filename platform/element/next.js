define(function(require,exports,module){
    
    var _sibling = require('./sibling');
    
    var next = function(el){
        return _sibling(el, 'nextSibling', 'nextSibling');
    }
    
    module.exports = next;
});