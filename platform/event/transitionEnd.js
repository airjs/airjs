define(function(require,exports,module){

    var _on = require('./on');
    var _un = require('./un');
    var ua = require('../browser/ua');
    
    var mouseenter = {
        lists:[],
        on:function(element, listener){
            _on(element,this._getType(),listener);
            return this;
        },
        un:function(element, listener){
            _un(element,this._getType(),listener);
            return this;
        },
        _getType:function(){
            var type = 'transitionend';
            if(ua.WEBKIT){
                type = 'webkitTransitionEnd';
            }
            return type;
        }
    };
    
    module.exports = mouseenter;
});