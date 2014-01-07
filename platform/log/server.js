define(function(require,exports,module){

    var defaultUrl = 'http://jsmsg.video.qiyi.com/m.gif';
    var serverLogimgList = {};

    var server = function(param,options){
        var url = defaultUrl;
        if(typeof options == 'string'){
            url = options;
            options = null;
        }
        options = options || {cache:false};
        if(options.url){
            url = options.url;
        }
        if(param){
            var img = new Image();
            var key = 'slog_' + Math.floor(Math.random() * 2147483648).toString(36);
            serverLogimgList[key] = img;
            img.onload = img.onerror = img.onabort = function(){
                img.onload = img.onerror = img.onabort = null;
                serverLogimgList[key] = null;
                delete serverLogimgList[key];
                img = null;
            };
            var params = [];
            if(options.cache === false){
                param._ = Math.round(Math.random() * 2147483647);
            }
            for(var pname in param){
                params.push(pname + '=' + encodeURIComponent(param[pname]));
            }
            img.src = url + '?' + params.join('&');
        }
    };

    module.exports = server;
});