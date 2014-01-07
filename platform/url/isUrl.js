define(function(require,exports,module){

    var isUrl = function(url){
        var reHost = /^\w+:\/\/[^\/:]+(?::\d{1,5}\/?|\/|$).*$/;
        
        return reHost.test(url);
    }
    
    module.exports = isUrl;
});