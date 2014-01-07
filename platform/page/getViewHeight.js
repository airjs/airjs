define(function(require,exports,module){

    var getViewHeight = function(str){
        var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
        return window.innerHeight || client.clientHeight;
    };

    module.exports = getViewHeight;
});