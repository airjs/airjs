define(function(require,exports,module){

    var pad = function(number,length){
        var pre = "",
            string = number;

        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
        return pre + string;
    };

    module.exports = pad;
});