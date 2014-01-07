define(function(require,exports,module){

    var _parse = require('../url/parse');

    var isSameDomain = function(surl,durl){
        if(surl.charAt(0) == '/' || durl.charAt(0) == '/'){
            return true;
        }
        var sobj = _parse(surl);
        var dobj = _parse(durl);
        //如果不是一个合法的url地址，也认为是同域请求 Add by piaoshihuang
        if(sobj == null || dobj == null){
            return true;
        }
        return dobj.host == sobj.host && dobj.protocol == sobj.protocol && dobj.port == sobj.port;
    };

    module.exports = isSameDomain;
});