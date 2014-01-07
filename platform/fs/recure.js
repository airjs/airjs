define(function(require,exports,module){
    
    var readDir = require('../../driver/fs/readDir');
    var stat = require('../../driver/fs/stat');
    
    function recure(path,fn,callback){
        var _this = this;
        var files = readDir(path);
        for(var i = 0, len = files.length; i < len; i++){
            var filename = files[i];
            if(!path.match(/\/$/)){
                path += '/';
            }
            stats = stat(path + filename);
            if(stats.isFile()){
                if(fn(path,filename) === false) break;
            }
            else if(stats.isDirectory()){
                if(filename.charAt(0) === '.') continue;
                var newpath = fn(path,filename) || (path + filename);
                recure(newpath + '/',fn);
            }
        }
        if(callback)callback();
    }

    module.exports = recure;
});