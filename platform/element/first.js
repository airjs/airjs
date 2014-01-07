define(function(require,exports,module){
    
    var _sibling = require('./sibling');
    
    var first = function(el){
        return _sibling(el, 'nextSibling', 'firstChild');
    }
    
    module.exports = first;
});