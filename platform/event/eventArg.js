define(function(require,exports,module){

    var stopPropagation = require('./stopPropagation');
    var preventDefault = require('./preventDefault');
    var stop = require('./stop');
    var extend = require('../object/extend');

    var EventArg = function (event,win) {
        win = win || window;
        event = event || win.event;
        var doc = win.document;
        var target = event.target || event.srcElement || win;
        var fromElement = event.fromElement;

        while (target && target.nodeType == 3){
            target = target.parentNode;
        }
 
        this.target = target;

        if ( !event.relatedTarget && fromElement ) {
            this.relatedTarget = fromElement === event.target ? event.toElement : fromElement;
        }

        this.keyCode = event.which || event.keyCode;

        for (var k in event) {
            var item = event[k];
            // 避免拷贝preventDefault等事件对象方法
            if ('function' != typeof item) {
                this[k] = item;
            }
        }

        //为鼠标滚轮事件所做的兼容
        if (event.type == "mousewheel" || event.type == "DOMMouseScroll"){
            this.wheelDelta = event.wheelDelta || -event.detail * 40;
        }
        
        if (!this.pageX && this.pageX !== 0) {
            this.pageX = (event.clientX || 0) 
                            + (doc.documentElement.scrollLeft 
                                || doc.body.scrollLeft);
            this.pageY = (event.clientY || 0) 
                            + (doc.documentElement.scrollTop 
                                || doc.body.scrollTop);
        }

        this.timeStamp = event && event.timeStamp || +(new Date());
        this._event = event;
    };

    extend(EventArg.prototype,{
        preventDefault:function(){
            preventDefault(this._event);
            return this;
        },
        stopPropagation:function(){
            stopPropagation(this._event);
            return this;
        },
        stop:function(){
            stop(this._event);
            return this;
        }
    });


    module.exports = EventArg;
});