define(function(require,exports,module){
    
    var remove = function (el,child) {
        el.removeChild(child);
    };
    
    module.exports = remove;
});