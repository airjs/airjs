define(function(require,exports,module){

    var Class = require('../class');
    var format = require('../string/format');
    var extend = require('../object/extend');
    var global = require('../../driver/global');
    var formatDate = require('../date/format');

    var infoStorage = {};
    var infoStorageKey = 'QInfo';
    var data = infoStorage[infoStorageKey] ? JSON.parse(infoStorage[infoStorageKey]) : [];
    var max = 300;
    var modulesToSave = {};
    var keysToPrint = {
        moduleName: '',
        date: '',
        message: '',
        tpl: '',
        level: ''
    };

    var toStr = function(data){
        var args = [data.tpl,data.level,data.moduleName,formatDate(new Date(data.date*1),'yyyy-MM-dd HH:mm:ss')];
        for(var i = 0; i < data.message.length; i++){
            args.push(data.message[i]);
        }
        var infoString = format.apply(null,args);
        return infoString;
    };

    var output = {
        log:function(data){
            if(global.console && console.log){
                console.log(toStr(data));
            }
        },
        info:function(data){
            if(global.console && console.info){
                console.info(toStr(data));
            }
        },
        debug:function(data){
            if(global.console && console.debug){
                console.debug(toStr(data));
            }
        },
        warn:function(data){
            if(global.console && console.warn){
                console.warn(toStr(data));
            }
        },
        error:function(data){
            if(global.console && console.error){
                console.error(toStr(data));
            }
        },
        flush:function(data){
            this.log(toStr(data));
        }
    };

    var InfoCenter = Class('InfoCenter',{
        construct:function(options){
            options = options || {};
            this._moduleName = options.moduleName || 'Unknown';
            this._tmpl = options.tmpl || '[%s][%s][%s] >>> %s';
            var out = {};
            extend(out,output);
            extend(out,options.output || {});
            this._output = out;
        },
        statics:{
            toStr: toStr,
            enable:function(){
                global.enabled = true;
            },
            disable:function(){
                global.enabled = false;
            },
            whatToSave:function(moduleNames){
                if(typeof moduleNames == 'string'){
                    modulesToSave[moduleNames] = true;
                }
                else if(moduleNames && moduleNames.length > 0){
                    moduleNames.forEach(function(moduleName){
                        modulesToSave[moduleName] = true;
                    });
                }
            },
            whatToPrint: function(keys) {
                var map = {};
                for (var key in keys) {
                    keysToPrint[key] = keys[key];
                }
            },
            setStorage:function(storageInfo){
                if (storageInfo.key) {
                    infoStorageKey = storageInfo.key;
                }
                infoStorage = storageInfo.storage;
                if(infoStorage[infoStorageKey]){
                    data = JSON.parse(infoStorage[infoStorageKey]);
                }
                else{
                    data = [];
                }
            },
            setOutput:function(obj){
                extend(output,obj || {});
            },
            flush:function(options){
                options = options || {};
                options = extend({
                    output:function(datas){
                        if(global.console){
                            for (var i = 0; i < datas.length; i++) {
                                datas[i] = toStr(datas[i]);
                            }
                            console.log(datas.join('\r\n'));
                        }
                    }
                },options);
                var filter = options.filter;
                var flushData = JSON.parse(infoStorage[infoStorageKey]);
                if(filter){
                    flushData = this._filter(filter);
                }
                options.output(flushData);
            },
            clear:function(){
                data = [];
                infoStorage[infoStorageKey] = '[]';
            },
            _filter:function(filter){
                var level = filter.level;
                var moduleName = filter.moduleName;
                var iteration = filter.fn || function(){return true;};
                var result = [];
                data.forEach(function(info){
                    if(level){
                        if(level.toUpperCase().indexOf(info.level.toUpperCase()) === -1){
                            return;
                        }
                    }
                    if(moduleName){
                        if(moduleName.toUpperCase().indexOf(info.moduleName.toUpperCase()) === -1){
                            return;
                        }
                    }
                    if(!iteration(info)){
                        return;
                    }
                    result.push(info);
                });
                return result;
            }
        },
        methods:{
            _formatInfo: function(arr, level) {
                arr = Array.prototype.slice.call(arr);
                var result = {};
                for (var key in keysToPrint) {
                    result[key] = keysToPrint[key];
                }
                result.moduleName = this._moduleName;
                result.date = new Date().getTime();
                result.message = arr;
                result.tpl = this._tmpl;
                result.level = level;
                return result;
            },
            log:function(str){
                var infos = this._formatInfo(arguments,'LOG');
                this._writeLog(infos);
                if(this._check()){
                    this._output.log(infos);
                }
            },
            debug:function(str){
                var infos = this._formatInfo(arguments,'DEBUG');
                this._writeLog(infos);
                if(this._check()){
                    this._output.debug(infos);
                }
            },
            info:function(str){
                var infos = this._formatInfo(arguments,'INFO');
                this._writeLog(infos);
                if(this._check()){
                    this._output.info(infos);
                }
            },
            warn:function(str){
                var infos = this._formatInfo(arguments,'WARN');
                this._writeLog(infos);
                if(this._check()){
                    this._output.warn(infos);
                }
            },
            error:function(str){
                var infos = this._formatInfo(arguments,'ERROR');
                this._writeLog(infos);
                if(this._check()){
                    this._output.error(infos);
                }
            },
            _writeLog:function(logObj){
                if(logObj && modulesToSave[logObj.moduleName]){
                    if(data.length >= max){
                        data.splice(0,1);
                    }
                    data.push(logObj);
                    this._save();
                }
            },
            _save:function(){
                infoStorage[infoStorageKey] = JSON.stringify(data);
            },
            _check:function(){
                return global.enabled;
            }
        }
    });

    module.exports = InfoCenter;
});