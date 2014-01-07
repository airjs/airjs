define(function(require,exports,module){
    var global = require('../../driver/global');
    var useOpacity = (typeof document.createElement("div").style.opacity != 'undefined');
    
    function hyphenate(name) {
        return name.replace(/[A-Z]/g,function (match) {
            return '-' + match.toLowerCase();
        });
    }
    
    var css = function (el, key, value) {
        var style;
        var otherKey;
        if(arguments.length == 2){
            if (global.getComputedStyle) {
                //ff7下，某些情况下会报错
                try{
                    return global.getComputedStyle(el, null).getPropertyValue(hyphenate(key));
                }
                catch(e){return '';}
            }
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var computedStyle = document.defaultView.getComputedStyle(el, null);
                if (computedStyle) return computedStyle.getPropertyValue(hyphenate(key));
                if (key == "display") return "none";
            }

            if(!useOpacity && key=='opacity'){
                key = 'filter';
                otherKey = 'opacity';
            }

            if (el.currentStyle) {
                style = el.currentStyle[key];
            }
            else{
                style = el.style[key];
            }

            if(!useOpacity && otherKey=='opacity'){
                if(style && style.toLowerCase().indexOf("opacity=") >= 0){
                    style = parseFloat(style.toLowerCase().match(/opacity=([^)]*)/)[1]) / 100;
                }
                else{
                    style =  1;
                }
            }

            return style;
        }
        else if(arguments.length == 3){
            if(!useOpacity && key=='opacity'){
               key = 'filter';
               value = 'Alpha(Opacity=' + value * 100 + ');';
            }
            el.style[key] = value;
        }
    };
    
    module.exports = css;
});