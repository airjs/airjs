define(function(require,exports,module){

    var pad = function(number,length){
        var pre = "",
            negative = (number < 0),
            string = String(Math.abs(number));

        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
        return (negative ?  "-" : "") + pre + string;
    };

    module.exports = pad;
});