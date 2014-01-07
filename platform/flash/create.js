define(function(require,exports,module){

    var _extend = require('../object/extend');
    var _ua = require('../browser/ua');
    var _toQuery = require('../url/jsonToQuery');

    var swf = function(path,opts){

        var opt = {
            id: null,
            height: 1,
            width: 1,
            styles:{},
            properties: {},
            params: {
                quality: 'high',
                allowScriptAccess: 'always',
                wMode: 'window',
                align: 'middle',
                bgcolor: '#000000',
                swLiveConnect: 'true',
                loop: 'true',
                play: 'true',
                DeviceFont: 'false',
                allowFullScreen: 'true',
                menu: 'true'
            },
            vars: {}
        };

        var id = opts.id || ('swf_' + Date.now().toString(36));
        var params = _extend(opt.params,opts.params || {});
        var vars = _extend(opt.vars,opts.vars || {});
        var styles = _extend(opt.styles,opts.styles || {});

        var properties = (function(){
            _extend(opt.properties,{
                height:opt.height,
                width: opt.width
            },function(t,s){
                if(s){
                    return true;
                }
            });

            _extend(opt.properties,
            opts.properties,
            function(t,s){
                if(s){
                    return true;
                }
            });

            return _extend(opt.properties,{
                    height:opts.height,
                    width: opts.width
                },
                function(t,s){
                    if(s){
                        return true;
                    }
                });
        })();

        params.flashVars = _toQuery(vars,function(value){
            return value;
        });

        if (_ua.IE){
            properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
            params.movie = path;
        }
        else {
            properties.type = 'application/x-shockwave-flash';
        }
        properties.data = path;

        var build = [];
        build.push('<object id="',id,'"');
        for (var property in properties){
            build.push(' ',property,'="',properties[property],'"');
        }
        build.push(' style="');
        for (var style in styles){
            build.push(style,':',styles[style],';');
        }
        build.push('"');
        build.push('>');
        for (var param in params){
            if (params[param]){
                build.push('<param name="',param,'" value="',params[param],'" />');
            }
        }
        build.push('</object>');
        return build.join('');
    };

    module.exports = swf;
});