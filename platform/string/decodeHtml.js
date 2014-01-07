define(function(require,exports,module){

    var decodeHtml = function(str){
        return String(str)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&")
                .replace(/&#39;/g,"'");  
    };

    module.exports = decodeHtml;
});