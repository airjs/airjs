define(function(require,exports,module){
    
    var append = function (el,child) {
        el.appendChild(child);
    };
    
    module.exports = append;
});