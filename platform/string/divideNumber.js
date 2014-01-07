define(function(require,exports,module){
    module.exports = function (n,p) {
        n = n+"";
        p = p || 3;
        var tmp = Math.ceil(n.length / p);
        var num = "";
        var left;
        for (var i = tmp; i > 0; i--) {
            if (n.length - (i - 1) * p <= 0) left = 0;
            else left = n.length - (i - 1) * p;
            num += "," + n.substring(left, n.length - i * p);
        }
        num = num.substring(1, num.length);
        return num;
    };
});