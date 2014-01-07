define(function(require,exports,module){
    
    var children = function (el) {

        for (var children = [], tmpEl = el.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
            if (tmpEl.nodeType == 1) {
                children.push(tmpEl);
            }
        }
        
        return children;    
    };
    
    module.exports = children;
});