define(function(require,exports,module){
    
    var request = require('./request');
    
    module.exports = function(url,options){
        if(options){
            var onsuccess = options.onsuccess;
            options.onsuccess = function(xhr,data){
                if(onsuccess){
                    onsuccess(xhr,data);
                }
            }
        }
        request(url,options);
    };
});