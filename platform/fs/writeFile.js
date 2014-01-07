define(function(require,exports,module){

    /*
     * writeFile(filename, data, [encoding])
     * @filename file path
     * @data     data can be a string or a buffer
     * @encoding defaults to 'utf8'
     */
    
    var writeFile = require('../../driver/fs/writeFile');
    
    module.exports = function(){
        return writeFile.apply(null,arguments);
    };
});