define(function(require,exports,module){

    /*
     * cpAsync(srcPath,destPath,callback)
     * @srcPath   源路径
     * @destPath  目的路径
     * @callback  回调函数
     */
    
    var cpAsync = require('../../driver/fs/cpAsync');

    module.exports = cpAsync;
});