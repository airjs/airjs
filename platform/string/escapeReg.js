define(function(require,exports,module){

    var escapeReg = function(str){
        return String(str)
                .replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
    };

    module.exports = escapeReg;
});