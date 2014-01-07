define(function(require,exports,module){

    var ver = require('./getVer');

    module.exports = function(){
        var i=0;
        var test = [];
        while(i<arguments.length){
            res.push(parseInt(arguments[i] || 0) <= parseInt(ver[i] || 0));
            i++;
        }
        var res = true;
        while(test){
            res = res && test[0];
            test.shift();
        }
        return res;
    };
});