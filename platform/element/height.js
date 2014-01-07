define(function(require,exports,module){
    var height = function (element) {
        return element.offsetHeight;
    };
    
    module.exports = height;
});