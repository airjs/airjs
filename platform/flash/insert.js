define(function(require,exports,module){

    var _create = require('./create');
    var _list = require('./list');

    module.exports = function(path,opts){
        opts.id = opts.id || 'swf_' + (new Date()*1).toString(36);
        var str = _create(path,opts);
        var div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = str;
        var ctn;
        if(opts.container){
            ctn = opts.container[0];
        }
        else{
            ctn = document.body;
        }
        ctn.insertBefore(div.firstChild,null);
        setTimeout(function(){
            _list.set(opts.id);
        },0);
        return opts.id;
    };

});