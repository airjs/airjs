define(function(require,exports,module){
    var fs = require('fs');
    var rimraf = require('rimraf');
    module.exports = function(destpath){
        if(fs.existsSync(destpath)){
            var stat = fs.statSync(destpath);
            try{
                if(stat.isFile()){
                    fs.unlinkSync(destpath);
                }
                else if(stat.isDirectory()){
                    rimraf.sync(destpath);
                }
            }
            catch(e){throw e;}
        }
    };
});