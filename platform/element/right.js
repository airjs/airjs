define(function(require,exports,module){
    var left = require('./left');
    var width = require('./width');
    var right = function (el) {
        return left(el) + width(el);
    };
    
    module.exports = right;
});