define(function(require,exports,module){
    var fs = require('fs');
    var path = require('path');

    var mkdir = function(dirpath,mode){
        if(!fs.existsSync(dirpath)){
            var parentPath = path.dirname(dirpath);
            if(fs.existsSync(parentPath)){
                fs.mkdirSync(dirpath,mode);
            }
            else{
                mkdir(parentPath);
                fs.mkdirSync(dirpath,mode);
            }
        }
    }

    module.exports = mkdir;


});