define(function(require,exports,module){
    
    var isDisconnected = function(node){
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    
    module.exports = isDisconnected;
});