define(function(require, exports, module) {
    var _on = require("./on");
    var _un = require("./un");
    var get = require("./get");
    var isTouchSupported = (function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch(e) {
            return false;
        }
    })();

    var inclick = {
        lists : [],
        on : function(element, listener) {
            var l = this.lists.length, item = this.lists[l];

            // 避免重复绑定事件
            while (l--) {
                if (this.lists[l].listener == listener && this.lists[l].element == element) {
                    return this;
                }
            }

            var enabled = false, moved = false, prex = 0, prey = 0;

            var touchstart = function(e) {
                enabled = true;
                moved = false;
                prex = e.pageX || e.touches[0].pageX;
                prey = e.pageY || e.touches[0].pageY;
            };
            var touchmove = function(e) {
                if (!enabled) {
                    return;
                }
                var dx = (e.pageX || e.touches[0].pageX) - prex;
                var dy = (e.pageY || e.touches[0].pageY) - prey;

                if (dx * dx > 25 || dy * dy > 25) {
                    moved = true;
                }
            };
            var touchend = function(e) {
                if (!moved) {
                    listener({
                        type : "inclick",
                        data : {
                            pageX : prex,
                            pageY : prey
                        },
                        event : e
                    });
                }
                enabled = false;
            };
            _on(element, isTouchSupported ? "touchstart" : "mousedown", touchstart);
            _on(element, isTouchSupported ? "touchmove" : "mousemove", touchmove);
            _on(element, isTouchSupported ? "touchend" : "mouseup", touchend);

            this.lists.push({
                "listener" : listener,
                "element" : element,
                "touchstart" : touchstart,
                "touchmove" : touchmove,
                "touchend" : touchend
            });

            return this;
        },
        un : function(element, listener) {
            var l = this.lists.length, item = this.lists[l];
            while (l--) {
                if (this.lists[l].listener == listener && this.lists[l].element == element) {
                    _un(element, isTouchSupported ? "touchstart" : "mousedown", this.lists[l].touchstart);
                    _un(element, isTouchSupported ? "touchmove" : "mousemove", this.lists[l].touchmove);
                    _un(element, isTouchSupported ? "touchend" : "mouseup", this.lists[l].touchend);
                    this.lists.splice(l, 1);
                }
            }
            return this;
        }
    };

    module.exports = inclick;
});
