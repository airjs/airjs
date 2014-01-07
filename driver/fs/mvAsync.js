define(function(require,exports,module){
    var exec = require('child_process').exec;
    var util = require('util');
    module.exports = function(srcPath,destPath,callback){
        var cmdName = 'mv';
        if(process.platform == 'win32'){
            cmdName = 'move';
        }
        var cmd = util.format('%s %s %s',cmdName,srcPath,destPath);
        exec(cmd,function(err,stdout,stderr){
            callback(err);
        });
    };
});