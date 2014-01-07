define(function(require,exports,module){
    var getPosition = require('./getPosition');
    var top = function (el,offsetParent) {
        if(offsetParent){
            return getPosition(el).top - getPosition(offsetParent).top;
        }
        return getPosition(el).top;
    };
    
    module.exports = top;
});