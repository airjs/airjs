define(function(require,exports,module){

    var getPosition = function (el) {
        try{
            var box = el.getBoundingClientRect();
        }
        catch(e){
            return {};
        }
        var doc = el.ownerDocument;
        var body = doc.body;
        var html = doc.documentElement;
        var clientTop = html.clientTop || body.clientTop || 0;
        var clientLeft = html.clientLeft || body.clientLeft || 0;
        var top = box.top + (window.pageYOffset || html.scrollTop || body.scrollTop) - clientTop;
        var left = box.left + (window.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
        return { 'top': top, 'left': left };
    }
    
    module.exports = getPosition;
});