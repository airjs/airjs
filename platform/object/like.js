define(function(require,exports,module){

    var like = function (target, source) {
        for (var p in source) {
            if (p in target && target[p] != source[p]) {
                return false;
            }
        }
        return true;
    };
    
    module.exports = like;
});