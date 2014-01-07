define(function(require,exports,module){
    var _$ = require('./selector/sizzle');
    var _Element = require('./element/element');
    var isWindow = function(win){
        return (win && typeof win === "object" && "setInterval" in win);
    }
    
    var init = function(selector, context){
        if (!selector) {
            return null;
        }
        
        if(_Element.isElement(selector)){
            return selector;
        }

        if(typeof selector === "string"){
            var ele = _$(selector, context);
            if(ele.length > 0){
                return new _Element(ele);
            }
            else{
                return null;
            }
        }
        else if(selector.nodeType === 9 || selector.nodeType === 1 || isWindow(selector)){
            return new _Element([selector]);
        }

        return null;
    }
    
    module.exports = init;
});