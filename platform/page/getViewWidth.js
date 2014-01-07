define(function(require,exports,module){

    var getViewWidth = function(str){
        var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
        return window.innerWidth || client.clientWidth;
    };

    module.exports = getViewWidth;
});