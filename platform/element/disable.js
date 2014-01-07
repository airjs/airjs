define(function(require,exports,module){
    
    var disable = function (elem,flag) {
        if(arguments.length == 1){
            return elem.disabled;
        }
        else if(arguments.length == 2){
            elem.disabled = flag;
        }
    };
    
    module.exports = disable;
});