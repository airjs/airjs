define(function(require,exports,module){

    /*
     * mvAsync(srcPath,destPath,callback)
     * @srcPath   源路径
     * @destPath  目的路径
     * @callback  回调函数
     */
    
    var mvAsync = require('../../driver/fs/mvAsync');

    module.exports = mvAsync;
});