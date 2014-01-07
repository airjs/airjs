define(function(require,exports,module){

    var log = function(){
        if(window.console){
            // console.log.apply(console, arguments);
        }
    }

    module.exports = log;
});