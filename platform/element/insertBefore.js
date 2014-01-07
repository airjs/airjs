define(function(require,exports,module){
    
    var insertBefore = function (el,child,refer) {
        el.insertBefore(child,refer);
    };
    
    module.exports = insertBefore;
});