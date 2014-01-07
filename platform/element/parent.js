define(function(require,exports,module){
    
    var parent = function(el,tagName){
        var parent = el.parentElement || el.parentNode || null;
        while(tagName && parent && parent.tagName && parent.tagName.toUpperCase() != tagName.toUpperCase()){
            parent = parent.parentElement || parent.parentNode;
        }
        return parent;
    }
    
    module.exports = parent;
});