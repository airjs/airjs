define(function(require,exports,module){
    var Class = require('../class');
    var $ = require('../dollar');
    var element = require('../element/element');
    var extend = require('../object/extend');
    var emptyMethod = require('../fn/emptyMethod');
    var tween = require('./tween');
    var isArray = require('../array/isArray');
    
    var Anim = Class('Anim',
    {
        construct:function(options)
        {
            this.opt = extend({
                duration: 1000,
                onStart: emptyMethod,
                onDone: emptyMethod,
                onCompute: emptyMethod,
                interval:10,
                ease: '',
                els: null
            }, options || {});
            this.ease();
            for(var i=0,l=this.opt.els.length;i<l;i++){
                if(!element.isElement(this.opt.els[i])){
                    throw new Error('all element must be isElement');
                }
            }
            this.els = this.opt.els;
            this.info = {};
        },
        properties:{
            counter:0
        },
        methods:{
            getAnim: function(len, from, to)
            {
                var temp = [];
                for (var i = 0; i < len; i++) {
                    temp.push(this.tweenFunc(i, from, to, len));
                }
                return temp;
            },
            getAnimInfo: function() 
            {
                this.interval = this.opt.duration / this.opt.interval;
                var info = null;
                for (var o in this.info) {
                    if (this.info[o].from == undefined) {
                        this.info[o].from = this.getDefaultFrom(this.els[0], o);
                    }
                    if (o == 'opacity') {
                        this.info[o].unit = '';
                    } else {
                        this.info[o].unit = 'px';
                    }
                    this.info[o].animArray = this.getAnim(this.interval, this.info[o].from, this.info[o].to - this.info[o].from);
                }
            },
            getDefaultFrom: function(el, type) 
            {
                return parseInt(el.css(type)) || 0;
            },

            onCompute: function() {
                for (var o in this.info) {
                    for(var i=0,l=this.els.length;i<l;i++){
                        this.els[i].css(o, this.info[o].animArray[this.counter] + this.info[o].unit);
                    }
                }
                this.counter++;
            },

            compute: function() {
                if (this.counter >= this.interval) {
                    clearTimeout(this.iTimer);
                    this.done();
                    this.counter = 0;
                    return;
                }
                this.onCompute();
                this.iTimer = setTimeout(function() {
                    this.compute();
                }.bind(this), this.opt.interval);
            },
            ease: function(ease) {
                if (!ease) {
                    this.tweenFunc = tween.Linear;
                    return this;
                }
                var type = ease.split('.');
                if (type.length != 2) {

                    this.tweenFunc = tween.Linear;
                } else {
                    this.tweenFunc = tween[type[0]][type[1]];
                }
                return this;
            },
            duration: function(duration) {
                this.opt.duration = duration;
                return this;
            },
            delay: function(interval) {
                this.opt.interval = interval;
                return this;
            },
            done: function() {
                for (var o in this.info) {
                    for(var i=0,l=this.els.length;i<l;i++){
                        this.els[i].css(o, this.info[o].to + this.info[o].unit);
                    }
                }
                this.info = {};
                if (this.opt.onDone)this.opt.onDone();
            },
            from: function(type, number) {
                if (!this.info[type]) {
                    this.info[type] = {};
                }
                this.info[type].from = number;
                return this;
            },
            to:  function(type, number) {
                if (!this.info[type]) {
                    this.info[type] = {};
                }
                this.info[type].to = number;
                return this;
            },
            go: function() {
                this.getAnimInfo();
                this.inAnim = true;
                if (this.iTimer) {
                    clearTimeout(this.iTimer);
                }
                this.compute();
                return this;
            },
            stop: function() {
                this.pause();
                this.counter = 0;
                return this;
            },
            pause: function(){
                if (this.inAnim) {
                    clearTimeout(this.iTimer);
                }
                this.getAnimInfo();
                return this;
            },
            resume: function(){
                this.compute();
            },
            onDone: function(func) {
                this.opt.onDone = func;
                return this;
            }
        }
    });

    module.exports = function(els,opt) {
        return new Anim({
            els : isArray(els) ? els : [els]
        });
    };
});