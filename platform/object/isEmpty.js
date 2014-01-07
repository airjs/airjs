define(function(require,exports,module){

    var isEmpty = function (obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    };
    
    module.exports = isEmpty;
});