define(function(require,exports,module){

    var global = require('../../driver/global');

    var getHeight = function(){
        var context = global;
        var doc = context.document;

        var body = doc.body;
        var html = doc.documentElement;
        var client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

        return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
    };

    module.exports = getHeight;
});