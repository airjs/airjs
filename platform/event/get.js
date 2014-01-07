define(function(require,exports,module){
    
    var EventArg = require('./eventArg');

    var get = function (event, win) {
        return new EventArg(event, win);
    };

    module.exports = get;
});