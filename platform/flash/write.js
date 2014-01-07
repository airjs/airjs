define(function(require,exports,module){

    var _create = require('./create');
    var _list = require('./list');

    module.exports = function(path,opts){
        opts.id = opts.id || 'swf_' + Date.now().toString(36);
        var str = _create(path,opts);
        document.write(str);
        setTimeout(function(){
            _list.set(opts.id);
        },0);
        return opts.id;
    };
});