define(function(require,exports,module){
    var getBrowser = function(){
        var _ua = navigator.userAgent.toLowerCase();
        var $Maxthon=false;
        try{
            var t=window.external;
            $Maxthon=t.max_version?true:false;
                if($Maxthon)
                    return "傲游 " +t.max_version;
            }catch(e){}
        if(/msie/.test(_ua))
            return _ua.match(/msie [\d.]+/)[0];
        if(/Firefox/i.test(_ua))
            return "firefox "+_ua.match(/firefox\/([\d.]+)/)[1];
        if(/360se/.test(_ua))
            return "360";
        if(/tencenttraveler/.test(_ua))
            return "TT";
        if(/chrome\/([\d.]+)/.test(_ua))
            return _ua.match(/chrome\/[\d.]+/);
        if(/safari/.test(_ua))
            return _ua.match(/safari\/[\d.]+/);
        if(/opera/.test(_ua))
            return "opera";
        return "非主流浏览器";
    }
    module.exports = getBrowser;
});