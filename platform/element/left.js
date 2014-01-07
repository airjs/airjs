define(function(require,exports,module){
    var getPosition = require('./getPosition');
    var left = function (el,offsetParent) {
        if(offsetParent){
            return getPosition(el).left - getPosition(offsetParent).left;
        }
        return getPosition(el).left;
    };
    
    module.exports = left;
});