define(function(require,exports,module){

    var _on = require('./on');
    var _un = require('./un');
    var get = require('./get');
    
    var fingerMove = {
        lists:[],
        on:function(element, listener){
            var l = this.lists.length,
                item = this.lists[l];        
            while (l--) {
                if(this.lists[l].listener == listener){
                    return this;
                }
            }

            var startX = null,
                startY = null,
                moveX = null,
                moveY = null;
                
            var touchstart = function(e){
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
            };
            
            var touchmove = function(e){
                get(e).stop();
                var endX = e.touches[0].pageX;
                var endY = e.touches[0].pageY;
                moveX = moveX==null ? startX : moveX;
                moveY = moveY==null ? startY : moveY;
                var disX = endX - moveX;
                var disY = endY - moveY;
                listener({
                    type:'fingermove',
                    event:e,
                    data:{
                        x:disX,
                        y:disY,
                        pageX:endX,
                        pageY:endY
                    }
                });
                moveX = endX;
                moveY = endY;
            };
            
            var touchend = function(e){
                startX = null;
                startY = null;
                moveX = null;
                moveY = null;
            };
            
            _on(element,'touchstart',touchstart);
            _on(element,'touchmove',touchmove);
            _on(element,'touchend',touchend);
            
            this.lists.push({
                'listener':listener,
                'touchstart':touchstart,
                'touchmove':touchmove,
                'touchend':touchend
            });
            
            return this;
        },
        un:function(element, listener){
            var l = this.lists.length,
                item = this.lists[l];
            while (l--) {
                if(this.lists[l].listener == listener){
                    _un(element,'touchstart',this.lists[l].touchstart);
                    _un(element,'touchmove',this.lists[l].touchmove);
                    _un(element,'touchend',this.lists[l].touchend);
                    this.lists.splice(l, 1);
                }
            }
            return this;
        }
    };
    
    module.exports = fingerMove;
});