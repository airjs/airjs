define(function(require,exports,module){
    module.exports = function (str) {
        if (typeof str == "undefined") {
            return 0;
        }
        var aMatch = str.match(/[^\x00-\x80]/g);
        return (str.length + (!aMatch ? 0 : aMatch.length));
    };
});