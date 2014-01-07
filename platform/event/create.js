define(function(require,exports,module){
    
    var stopPropagation = require('./stopPropagation');
    var preventDefault = require('./preventDefault');

    var create = function (type, opts) {
        var evnt;
        if( document.createEvent )
            evnt = document.createEvent( "HTMLEvents" ),
            evnt.initEvent( type, true, true );
        else if( document.createEventObject )
            evnt = document.createEventObject(),
            evnt.type = type;
        var extraData = {};
        if( opts )for( var name in opts )
            try{
                evnt[ name ] = opts[ name ];
            }catch(e){
                if( !evnt.extraData )
                    evnt.extraData = extraData;
                extraData[ name ] = opts[ name ];
            }
        return evnt;
    };
    module.exports = create;
});