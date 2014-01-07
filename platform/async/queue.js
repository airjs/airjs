/**
 *  异步执行队列
 */
define(function(require,exports,module){

    var Class = require('../class');

    module.exports = Class('AsyncQueue',{
        construct:function(){
            this._queue = [];
            this._event = {};
        },
        methods:{
            enqueue:function(/*fn[,param]*/){
                var fn,param;
                if(arguments.length == 1){
                    fn = arguments[0];
                }
                if(arguments.length == 2){
                    fn = arguments[0];
                    param = arguments[1];
                }
                this._queue.push({fn:fn,param:param});
            },
            dequeue:function(){
                var _this = this;
                if(this._queue.length == 0){
                    this.end(true);
                }
                else{
                    var curr = this._queue.splice(0,1)[0];
                    curr.fn(curr.param);
                }
            },
            start:function(){
                this.dequeue();
            },
            end:function(data){
                this.fire('end',data);
            },
            on:function(type,callback){
                if(!this._event[type]){
                    this._event[type] = [];
                }
                this._event[type].push(callback);
            },
            fire:function(type,data){
                if(this._event[type]){
                    for(var i = 0; i < this._event[type].length; i++){
                        this._event[type][i](data);
                    }
                }
            },
            clear:function(){
                this._queue = [];
            }
        }
    });
});