define(function(require,exports,module){

    var parse = function(url){
        var reHost = /(\w+):\/\/([^\/:]+):?(\d*)((?:\/|$)[^?#]*)/;
        var parts = url.match(reHost);
        if(parts){
            var protocol = parts[1];
            var host = parts[2];
            var port = parts[3];
            var path = parts[4];
            return {protocol:protocol,host:host,port:port,path:path};
        }
        
        return null;
    }
    
    module.exports = parse;
});