define(function(require,exports,module){
    
    var removeAttr = function (element, key) {
        element.removeAttribute(key);
    };
    
    module.exports = removeAttr;
});