define(function(require, exports, module) {
    var _s = {};
    var _ua = navigator.userAgent.toLowerCase();
    var _plug = navigator.plugins;

    var iPad = _ua.match(/(ipad).*os\s([\d_]+)/),
        iPhone = !iPad && _ua.match(/(iphone\sos)\s([\d_]+)/),
        android = _ua.match(/(Android)\s+([\d.]+)/);

    _s.IE = /msie/.test(_ua);
    _s.OPERA = /opera/.test(_ua);
    _s.MOZ = /gecko/.test(_ua);
    _s.IE6 = /msie 6/.test(_ua);
    _s.IE7 = /msie 7/.test(_ua);
    _s.IE8 = /msie 8/.test(_ua);
    _s.IE9 = /msie 9/.test(_ua);
    _s.SAFARI = /safari/.test(_ua) && !(/chrome/.test(_ua));
    _s.mobileSafari = (/iPhone/i.test(navigator.platform) ||
        /iPod/i.test(navigator.platform) ||
        /iPad/i.test(navigator.userAgent)) &&
        !!navigator.appVersion.match(/(?:Version\/)([\w\._]+)/);
    _s.WEBKIT = /webkit/.test(_ua);
    //_s.winXP=/windows nt 5.1/.test(_ua);
    //_s.winVista=/windows nt 6.0/.test(_ua);
    _s.CHROME = /chrome/.test(_ua);
    _s.iPhone = /iphone os/.test(_ua); //iphone 的检测
    _s.iPod = /iPod/i.test(_ua); //ipod 的检测
    _s.android = /android/.test(_ua); //android 的检测
    _s.iPhone4 = /iphone os [45]_/.test(_ua); //iphone 4的检测
    _s.iPad = /ipad/.test(_ua); // ipad的检测
    _s.WP = /windows phone/.test(_ua);

    _s.baidu = /baidu/.test(_ua); //百度浏览器
    _s.mbaidu = /baidu/.test(_ua); //百度浏览器
    _s.m360 = /360/.test(_ua); //360手机浏览器检测
    _s.muc = /uc/.test(_ua); //uc手机浏览器检测
    _s.mqq = /qq/.test(_ua); //qq浏览器检测

    if (android) {
        _s.version = android[2];
    }
    if (iPhone) {
        _s.ios = true;
        _s.version = iPhone[2].replace(/_/g, ".");
    }
    if (iPad) {
        _s.ios = true;
        _s.version = iPad[2].replace(/_/g, ".");
    }
    if (_s.iPod) {
        _s.ios = true;
    }
    _s.lePad = /lepad_hls/.test(_ua); //联想lePad检测
    _s.Mac = /macintosh/.test(_ua);
    //_s.video = _s.iPad || _s.iPhone || _s.lePad; //iphone、ipad、mac机和lePad的综合检测
    //_s.noFlashAndroid = _s.WEBKIT && _s.android &&
    //(!_plug || !_plug["Shockwave Flash"]);//不支持flash的安卓机器（支持html5Video标签）
    _s.TT = /tencenttraveler/.test(_ua);
    _s.$360 = /360se/.test(_ua);
    _s.ff = /firefox/.test(_ua);
    _s.uc = /uc/.test(_ua);
    //_s.ff4 = /firefox\/4/.test(_ua);
    _s.Maxthon = false;
    try {
        _s.html5Video = !! document.createElement('video').play;
    } catch (e) {
        _s.html5Video = false;
    }
    try {
        var t = window.external;
        _s.Maxthon = t.max_version ? true : false;
    } catch (e) {}
    module.exports = _s;
});