define(function(require,exports,module){
    
    var sibling = function (el, direction, start) {

        for (var node = el[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return node;
            }
        }

        return null;
    };
    
    module.exports = sibling;
});