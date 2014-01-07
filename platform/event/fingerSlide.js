define(function(require,exports,module){

    var _on = require('./on');
    var _un = require('./un');
    var get = require('./get');
    
    var fingerSlide = {
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
                timeStamp = null;
                
            var touchstart = function(e){
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
            };
            
            var touchend = function(e){
                get(e).stop();
                var distanceX = e.changedTouches[0].pageX - startX;
                var distanceY = e.changedTouches[0].pageY - startY;
                var time = e.timeStamp - timeStamp;
                listener({
                    type:'fingerslide',
                    event:e,
                    data:{
                        x:distanceX,
                        y:distanceY,
                        time:time
                    }
                });
                startX = null;
                startY = null;
                timeStamp = null;
            };
            
            _on(element,'touchstart',touchstart);
            _on(element,'touchend',touchend);
            
            this.lists.push({
                'listener':listener,
                'touchstart':touchstart,
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
                    _un(element,'touchend',this.lists[l].touchend);
                    this.lists.splice(l, 1);
                }
            }
            return this;
        }
    };
    
    module.exports = fingerSlide;
});