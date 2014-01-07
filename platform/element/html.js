define(function(require,exports,module){
    
    var _html = function (el,pos,html) {
        //get
        if(arguments.length == 1){
            return el.innerHTML;
        }
        //innerHTML
        if(arguments.length == 2){
            el.innerHTML = arguments[1];
            return el;
        }
        var range,begin;
        if (el.insertAdjacentHTML) {
            el.insertAdjacentHTML(pos, html);
        } else {
            range = el.ownerDocument.createRange();
            pos = pos.toUpperCase();
            if (pos == 'AFTERBEGIN' || pos == 'BEFOREEND') {
                range.selectNodeContents(element);
                range.collapse(pos == 'AFTERBEGIN');
            } else {
                begin = pos == 'BEFOREBEGIN';
                range[begin ? 'setStartBefore' : 'setEndAfter'](el);
                range.collapse(begin);
            }
            range.insertNode(range.createContextualFragment(html));
        }
        return el;
    };

    var html = function(els,pos,html){
        var arr = [];
        var slice = Array.prototype.slice;
        args = slice.call(arguments,1);
        els.forEach(function(el){
            arr.push(_html.apply(this,[el].concat(args)));
        })
        return arr.length == 1 ? arr[0] : arr;
    }
    
    module.exports = html;
});