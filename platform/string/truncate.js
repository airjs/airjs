define(function(require,exports,module){
    var getLen = require("./getLength");
    var truncate = function(str,len,suffix){
        if(typeof suffix == 'undefined')
            suffix =  "..";
        if (getLen(str) <= len) {
            return str;
        }
        var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
        //wangxiang 2010-12-24  如果后缀为空，不需要减少一个字符。
        str = str.slice(0, str.length - (suffix === "" ? 0 : 1)) + suffix;
        return str;
    };

    module.exports = truncate;
});