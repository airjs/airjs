define(function(require,exports,module){
    
    var value = function (element, value) {
        if(arguments.length == 1){
            return element.value;
        }
        else if(arguments.length == 2){
            element.value = value;
        }
    };
    
    module.exports = value;
});