define(function(require,exports,module){

    var encodeHtml = function(str){
        return String(str)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
    };

    module.exports = encodeHtml;
});