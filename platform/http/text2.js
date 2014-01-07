define(function(require,exports,module){
    
    var req = require('./req');
    
    module.exports = function(url,options){
        if(options){
            var onsuccess = options.onsuccess;
            options.onsuccess = function(xhr,data){
                if(onsuccess){
                    onsuccess(xhr,data);
                }
            }
        }
        req(url,options);
    };
});