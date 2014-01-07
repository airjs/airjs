define(function(require,exports,module){
    
    var clone = function (el,deep) {
        return el.cloneNode(deep);
    };
    
    module.exports = clone;
});