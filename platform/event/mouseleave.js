define(function(require,exports,module){

    var _on = require('./on');
    var _un = require('./un');
    var _ua = require('../browser/ua');
    var _contains = require('../element/contains');
    var hasNative = _ua.IE || ('onmouseenter' in window);

    var mouseleave = {
        lists:[],
        on:function(element, listener){
            var l = this.lists.length,
                item = this.lists[l],
                mouseout;
            while (l--) {
                if(this.lists[l].listener == listener && this.lists[l].element == element){
                    return this;
                }
            }
            if(hasNative){
                _on(element,'mouseleave',listener);
            }
            else{
                mouseout = function(e){
                    var related = e.relatedTarget,
                        current = this,
                        flag;
                    if (related == null) {
                        flag = true;
                    }
                    else if (!related) {
                        flag = false;
                    }
                    else{
                        flag = (related != current && !_contains(current,related));
                    }
                    if(flag){
                        listener.apply(this,arguments);
                    }
                };
                _on(element,'mouseout',mouseout);
            }
            this.lists.push({
                'listener':listener,
                'mouseout':mouseout,
                'element':element
            });
            return this;
        },
        un:function(element, listener){
            var l = this.lists.length,
                item = this.lists[l];
            while (l--) {
                if(this.lists[l].listener == listener && this.lists[l].element == element){
                    if(hasNative){
                        _un(element,'mouseleave',listener);
                    }
                    else{
                        _un(element,'mouseout',this.lists[l].mouseout);
                    }
                    this.lists.splice(l, 1);
                }
            }
            return this;
        }
    };

    module.exports = mouseleave;
});