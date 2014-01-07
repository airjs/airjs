define(function(require,exports,module){

    var dom = [];
    var custom = {};
    var listeners = {
        'domListeners':dom,
        'customListeners':custom
    }
    
    module.exports = listeners;
});