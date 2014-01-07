define(function(require,exports,module){
    
    var create = require('./create');

    var fire = function (element,type, data) {
        var ev = create(type, data);
        if( element.dispatchEvent )
            return element.dispatchEvent( ev );
        else if( element.fireEvent )
            return element.fireEvent( "on" + type, ev );
    };
    module.exports = fire;
});