define(function(require,exports,module){
    
    var _extend = require('../object/extend');
    var _getLen = require('../array/getLen');
    var _on = require('../event/on');
    var _un = require('../event/un');
    var _fire = require('../event/fire');
    var _cee = require('../event/customElementEvent');
    var _Class = require('../class');

    var _parent = require('./parent');
    var _children = require('./children');
    var _first = require('./first');
    var _last = require('./last');
    var _prev = require('./prev');
    var _next = require('./next');
    
    var _down = require('./down');
    var _contains = require('./contains');
    
    var _hasClass = require('./hasClass');
    var _addClass = require('./addClass');
    var _removeClass = require('./removeClass');
    var _html = require('./html');
    var slice = Array.prototype.slice;
    var _css = require('./css');
    var _attr = require('./attr');
    var _removeAttr = require('./removeAttr');
    var _value = require('./value');
    var _left = require('./left');
    var _top = require('./top');
    var _setPosition = require('./setPosition');
    var _getPosition = require('./getPosition');
    var _width = require('./width');
    var _height = require('./height');
    var _delegate = require('./delegate');
    var _undelegate = require('./undelegate');
    var _append = require('./append');
    var _remove = require('./remove');
    var _insertBefore = require('./insertBefore');
    var _show = require('./show');
    var _hide = require('./hide');
    var _disable = require('./disable');
    var isArray = require('../array/isArray');
    var _isInScreen = require('./isInScreen');
    var _equal = require('./equal');
    var _clone = require('./clone');
    var _prefixes = require('./prefixes');

    var getEleByFun = function(fun){
        var els = [];
        var args = slice.call(arguments,1);
        var fullArgs;
        for(var i=0;i<this.length;i++){
            fullArgs = [this[i]].concat(args);
            els = els.concat(fun.apply(this,fullArgs));
        }
        if(els.length){
            return new Element(els);
        }
        else{
            return null;
        }
    };
    //获取非null元素
    var getNotNullEleByFun = function(fun){
        var els = [];
        var args = slice.call(arguments,1);
        var fullArgs;
        for(var i=0;i<this.length;i++){
            fullArgs = [this[i]].concat(args);
            var elem = fun.apply(this,fullArgs);
            if(!elem) return null;
            els = els.concat(elem);
        }
        if(els.length){
            return new Element(els);
        }
        else{
            return null;
        }
    };
    
    var getResByFun = function(fun){
        var args = slice.call(arguments,1);
        var res = this.map(
            function(item){
                return fun.apply(this,[item].concat(args));
            }
        );
        if(res.length == 1){
            return res[0];
        }
        return res;
    };
    var Element = _Class('Element',{
        construct:function(els){
            if(!isArray(els)){
                els = [els];
            }
            this._els = els;  
            this.length = 0;
            this.eUid = ++Element.uuid;
            Array.prototype.push.apply(this, els);
            return this;
        },
        statics:{
            uuid:0,
            isElement:function(el){
                if(el && el.length && el.eUid){
                    return true
                }
                return false;
            },
            create:function(options){
                var elem = document.createElement(options.tagName);
                return new Element(elem);
            }
        },
        methods:{
            getLen:function(){
                return _getLen(this);
            },
            on:function(type, listener){
                if(_cee[type]){
                    this.forEach(function(item){
                        _cee[type].on(item,listener);
                    });
                }
                else{
                    getResByFun.call(this,_on,type,listener);
                }
                return this;
            },
            un:function(type, listener){
                if(_cee[type]){
                    this.forEach(function(item){
                        _cee[type].un(item,listener);
                    });
                }
                else{
                    getResByFun.call(this,_un,type,listener);
                }
                return this;
            },
            fire:function(type, data){
                getResByFun.call(this,_fire,type,data);
                return this;
            },
            children:function(){
                return getEleByFun.call(this,_children);
            },
            parent:function(tagName){
                return getNotNullEleByFun.call(this,_parent,tagName);
            },
            down:function(selector){
                return getEleByFun.call(this,_down,selector);
            },
            first:function(){
                return getEleByFun.call(this,_first);
            },
            last:function(){
                return getEleByFun.call(this,_last);
            },
            prev:function(){
                return getEleByFun.call(this,_prev);
            },
            next:function(){
                return getEleByFun.call(this,_next);
            },
            contains:function(el){
                if(Element.isElement(el)){
                    el = el[0];
                }
                return getResByFun.call(this,_contains,el);
            },
            hasClass:function(selector){
                return getResByFun.call(this,_hasClass,selector);
            },
            addClass:function(selector){
                getResByFun.call(this,_addClass,selector);
                return this;
            },
            removeClass:function(selector){
                getResByFun.call(this,_removeClass,selector);
                return this;
            },
            html:function(pos,html){
                var args = slice.call(arguments,0);
                if(arguments.length == 0){
                    return _html.apply(this,[this._els].concat(args));
                }
                _html.apply(this,[this._els].concat(args));
                return this;
            },
            css:function(key,value){
                if(arguments.length == 1){
                    return getResByFun.call(this,_css,key);
                }
                else{
                    getResByFun.call(this,_css,key,value);
                    return this;
                }
            },
            attr:function(key,value){
                if(arguments.length == 1){
                    return getResByFun.call(this,_attr,key);
                }
                else{
                    getResByFun.call(this,_attr,key,value);
                    return this;
                }
            },
            removeAttr:function(key){
                getResByFun.call(this,_removeAttr,key);
                return this;
            },
            value:function(value){
                if(arguments.length == 0){
                    return getResByFun.call(this,_value);
                }
                else{
                    getResByFun.call(this,_value,value);
                    return this;
                }
            },
            left:function(offsetParent){
                if(offsetParent && Element.isElement(offsetParent)){
                    offsetParent = offsetParent[0];
                }
                return getResByFun.call(this,_left,offsetParent);
            },
            top:function(offsetParent){
                if(offsetParent && Element.isElement(offsetParent)){
                    offsetParent = offsetParent[0];
                }
                return getResByFun.call(this,_top,offsetParent);
            },
            setPosition:function(position){
                getResByFun.call(this,_setPosition,position);
                return this;
            },
            getPosition:function(position){
                return getResByFun.call(this,_getPosition);
            },
            width:function(){
                return getResByFun.call(this,_width);
            },
            height:function(){
                return getResByFun.call(this,_height);
            },
            delegate:function(delegate, callback, evt){
                getResByFun.call(this,_delegate,delegate, callback, evt);
                return this;
            },
            undelegate:function(delegate, callback, evt){
                getResByFun.call(this,_undelegate,delegate, callback, evt);
                return this;
            },
            append:function(child){
                if(Element.isElement(child)){
                    child = child[0];
                }
                _append(this._els[0],child);
                return this;
            },
            remove:function(child){
                if(Element.isElement(child)){
                    child = child[0];
                }
                _remove(this._els[0],child);
                return this;
            },
            insertBefore:function(child,refer){
                if(Element.isElement(child)){
                    child = child[0];
                }
                if(Element.isElement(refer)){
                    refer = refer[0];
                }
                _insertBefore(this._els[0],child,refer);
                return this;
            },
            show:function(){
                getResByFun.call(this,_show);
                return this;
            },
            hide:function(){
                getResByFun.call(this,_hide);
                return this;
            },
            disable:function(flag){
                if(arguments.length == 0){
                    return getResByFun.call(this,_disable);
                }
                else{
                    getResByFun.call(this,_disable,flag);
                    return this;
                }
            },
            isInScreen:function(){
                return getResByFun.call(this,_isInScreen);
            },
            equal:function(elem){
                if(Element.isElement(elem)){
                    elem = elem[0];
                }
                return _equal(this._els[0],elem);
            },
            indexOf:function(){
                return Array.prototype.indexOf.apply(this,arguments);
            },
            lastIndexOf:function(){
                return Array.prototype.lastIndexOf.apply(this,arguments);
            },
            filter:function(){
                return Array.prototype.filter.apply(this,arguments);
            },
            map:function(){
                return Array.prototype.map.apply(this,arguments);
            },
            forEach:function(){
                return Array.prototype.forEach.apply(this,arguments);
            },
            some:function(){
                return Array.prototype.some.apply(this,arguments);
            },
            every:function(){
                return Array.prototype.every.apply(this,arguments);
            },
            slice:function(){
                return Array.prototype.slice.apply(this,arguments);
            },
            reduceRight:function(){
                return Array.prototype.reduceRight.apply(this,arguments);
            },
            reduce:function(){
                return Array.prototype.reduce.apply(this,arguments);
            },
            clone:function(deep){
                return getResByFun.call(this,_clone,deep);
            },
            prefixes:function(props){
            	return _prefixes(this,props);
            }
            
        }
    });
    module.exports = Element;
});