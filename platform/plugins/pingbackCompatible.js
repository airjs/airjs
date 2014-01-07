define(function(require,exports,module){
    var global = require('../../driver/global');

    global.lib = global.lib || {};
    global.lib.swf = global.lib.swf || {};

    //flashUid
    global.lib.swf.postServerUID = function(str){
        global.lib.qa_postServerUID = str;
    };

    //webeventid
    global.postWebEventID = function(weid){
        global.webEventID = weid;
    };
});