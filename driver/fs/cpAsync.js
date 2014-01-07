define(function(require,exports,module){
    var exec = require('child_process').exec;
    var util = require('util');
    module.exports = function(srcPath,destPath,callback){
        exec(util.format('cp %s %s -r',srcPath,destPath),function(err,stdout,stderr){
            callback(err);
        });
    };
});