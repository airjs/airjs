define(function(require,exports,module){
    
    var req = require('./req');
    
    module.exports = function(url,options){
        if(options){
            var onsuccess = options.onsuccess;
            options.onsuccess = function(xhr,data){
                var data = data.trim();
                var obj = null;
                data = data.replace(/^[^\[\{]*([\[\{].*[\]\}]).*?$/,'$1');
                try{
                    obj = JSON.parse(data);
                }
                catch(e){}
                if(!obj){
                    try{
                        obj = (new Function("return (" + data + ")"))();
                    }
                    catch(e){}
                }
                if(onsuccess){
                    onsuccess(xhr,obj);
                }
            }
        }
        req(url,options);
    };
});