define(function(require,exports,module){
    //将秒数转换成小时:分:秒的形式
    module.exports = function(seconds){
        if(isNaN(seconds)){return '00:00:00';}
        var hours = seconds > 3600 ? Math.floor(seconds/3600):0;
        var minute = seconds%3600 >= 60 ? Math.floor(seconds%3600 /60)  : 0;
        minute = (minute>=10?minute:("0"+minute));
        seconds = minute >= 0 ? seconds % 3600 % 60 : seconds;
        seconds = (seconds >=10 ? seconds :("0"+seconds));
        return hours > 0 ?((hours>9?hours:'0'+hours) + ":"+minute +":"+seconds):(minute+":"+seconds);
    };
});