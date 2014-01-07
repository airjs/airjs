define(function(require,exports,module){
    var global = require('../../driver/global');
    var __callbacks__ = require('../../platform/__callbacks__');
    var swfInsert = require('../../platform/flash/insert');
    var swfVer = require('../../platform/flash/getVer');
    var domReady = require('../../platform/element/ready');
    var _queryToJson = require('../../platform/url/queryToJson');

    var swf;
    var id;
    var on = function(){};
    var protocol = window.location.protocol;
    var customUrl = _queryToJson(window.location.search).clear;
    var url = (customUrl || (protocol + "//www.iqiyi.com/player/cupid/common/clear.swf")) + '?r=' + Math.floor(Math.random() * 2147483648).toString(36);
    var list = {};
    var ready = false;

    if(swfVer[0] == '0'){
        return;
    }

    __callbacks__['iqiyi_clear_ready'] = function(){
        ready = true;
        var fn;
        while(list['ready'] && list['ready'].length){
            try{
                fn = list['ready'].shift();
                fn(instance());
            }
            catch(e){
            }
        }
    };

    on = function(type,listener){
        type = type.replace(/^on/i, '');
        type = type.toLowerCase();
        list[type] = list[type] || [];
        if(id && ready){
            listener(instance());
        }
        else{
            list[type].push(listener);
        }
    };

    domReady(function(){
        id = swfInsert(
            url,{
                styles:{
                    position:'absolute',
                    top:'0',
                    left:'0',
                    zIndex:'-999'
                }
            }
        );
    });

    var instance = function(){
        return document.getElementById(id);
    };

    module.exports = {
        on:on,
        notice:function(json){
            var swf = instance();
            if(swf && swf.notice){
                swf.notice(JSON.stringify(json));
            }
            else{
                //todo
            }
        },
        //咱们把clear提供的方法都封装起来使用,尽量不使用get方法
        get:function(){
            return instance();
        }
    };
});