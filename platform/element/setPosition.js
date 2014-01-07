define(function(require,exports,module){
    var css = require('./css');
    var setPosition = function (element, position) {
        var left = css(element, "marginLeft");
        var top = css(element, "marginTop");
        css(element,"left",left ? position.left - parseFloat(left) + "px" : 0);
        css(element,"top",top ? position.top - parseFloat(top) + "px" : 0);
        return element;
    };
    module.exports = setPosition;
});