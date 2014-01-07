define(function(require,exports,module){
    var Class = require('../class');
    var ceon = require('./ceon');
    var ceun = require('./ceun');
    var cefire = require('./cefire');
    var CustomEvent = Class('CustomEvent',{
        methods:{
            filter:function(list){
                this.filters = list;
            },
            on:function(type,listener){
                ceon(this,type,listener);
            },
            un:function(type,listener){
                ceun(this,type,listener);
            },
            fire:function(param){
                cefire(this,param);
            }
        }
    });

    module.exports = new CustomEvent();
});