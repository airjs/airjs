define(function(require,exports,module){
    var Class = require('../class');
    var extend = require('../object/extend');
    module.exports = Class('Template',
    {
        /*
         * @template 模板字符串
         * @opt      
         */
        construct:function(template,opt)
        {
            this.template = template + '';
            //默认针对匹配符是#{name}的形式做处理
            this.filter = "\\";
            this._isNesting = /([\s\S])?\$[^{]*?\{(?:(?![{}]).|\{(?:(?![{}]).)*\})*\}/;
            this._regPattern = /([\s\S]?)\$(\w*){((?:(?:\$\w*){(?:(?:\$\w*)?{(?:(?:\$\w*)?{(?:(?:\$\w*)?{(?:(?:\$\w*)?{(?:(?:\$\w*)?{[^{}]*}|[^{}])*}|[^{}])*}|[^{}])*}|[^{}])*}|[^{}])*}|[^{}])*)?}/g;

            this._funs = {};
            this._tmp_cache = {};
            this.params = {};
            this.self_params = {};

            if(opt){
                for(var n in opt){
                    if(opt.hasOwnProperty(n)){
                        if(typeof opt[n] == "function"){
                            this._funs[n] = opt[n];
                        }else{
                            this.self_params[n] = opt[n];
                        }
                    }
                }
            }
        },
        methods:
        {
            evaluate: function (obj,opt) {
            var _template = "";
            if (typeof obj == "object") {

                this._tmp_cache = {};
                this.params = obj;
                obj && extend(this.params,this.self_params);
                obj && extend(this.params,opt);
                var _this = this;
                _template = this.template.replace(this._regPattern, function (all, filter, name,content) {
                    //filter = filter || "";
                    if(new RegExp("^\\" + _this.filter,"").test(all)){
                        return all.split(""+_this.filter)[1];
                    }
                    if(_this._isNesting.test(content)){
                        content = content.replace(_this._regPattern, arguments.callee);
                    }
                    
                    var args = content ? content.split(",") : [];
                    for(var cat = 0,len = args.length; cat < len ; cat++){
                        args[cat] = _this.trim(args[cat]);
                    }
                    switch(name){
                        case "":
                            return filter + _this.get(args[0]);
                        case "trim":
                            if(len == 2 && args[1] && args[1].toLowerCase() == "html"){
                                var d = _this.get(args[0]);
                                return filter + (d ? _this.trimHTML(d) : "");
                            }else{
                                d = _this.get(args[0]);
                                return filter + (d ? _this.trim(d) : "");
                            }                            
                        case "encode":
                            var e =  _this.get(args[0]);
                            return filter + (e && _this.encode(e));
                        case "time":
                            if(!/\d*/g.test(args[0])){
                                throw new Error("error(Template): time format is incorrect");
                            }
                            var ti = _this.get(args[0]) || 0;
                            return filter + (ti ? _this.time_format(ti) : "");
                        case "date":
                            if(!args[1]){
                                throw new Error("error(Template): date format argument[1] is null");
                            }
                            var d = _this.get(args[0]);
                            //2011-08-26 16:10:06
                            if(!(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g.test(d))){
                                throw new Error("error(Template): date format is incorrect");
                            }
                            return filter + (d ? _this.date_format(d,args[1]) : "");
                        case "evalstr" :
                            var ev;
                            try{
                                 ev = _this.get(args[0]);
                            }catch(err){
                                throw new Error("error(Template): evalstr error");
                            }
                            return filter + (eval(ev));
                        case "cache":
                            if(obj[args[1]]){
                                throw new Error("error(Template): cache key the same with params key is not allowed");
                            }
                            (args[0] && (_this._tmp_cache[args[1]] = args[0]))|| (obj[args[0]] && (_this._tmp_cache[args[1]] = obj[args[0]]));
                            return filter;
                        case "fixed":
                            var f = _this.get(args[0]);
                            if(args[1]){
                                return filter + (f && _this.fixed(f,args[1]) || "");
                            }else{
                                return filter + f
                            }
                        case "img" :
                            var im = _this.get(args[0]);
                            return filter + im.setImgSize(args[1]);
                        case "arr" : 
                            var ar = args.slice(0,args.length-1).join();
                            var ar = /\[[^\]]*\]/.test(ar) ? ar : _this.get(args[0]);
                            if(typeof ar == "string"){
                                try{
                                    ar = eval("("+ar+")");
                                }catch(err){
                                    throw new Error("error(Template): array format error");
                                }
                            } 
                            var idx = args[args.length - 1] ? args[args.length - 1] : 0;
                            return filter + (ar[idx] || "");
                        case "obj" :
                            var ob = args.slice(0,args.length-1).join();
                            var ob = /{[^}]*}/.test(ob) ? ob : _this.get(args[0]);
                            //var ob = _this.get(args[0]);
                            if(typeof ob == "string"){
                                try{
                                    ob = eval("("+ob+")");
                                }catch(err){
                                    throw new Error("error(Template): object format error");
                                }
                            } 
                            var key = args[1];
                            return filter + (key && ob[key] || "");
                        case "pick":
                            try{
                                switch(len){
                                    case 2 : 
                                        var p = _this.get(args[0]);
                                        return filter + (eval(p + "? '" + args[1] +"' : ''"));
                                    case 3 : 
                                        p = _this.get(args[0]);
                                        return filter + (eval(p + "? '" + args[1] + "':'" + args[2]+"'"));
                                    case 4 :
                                        p =  _this.get(args[0]);
                                        return filter + (p ? (p == args[1] ? args[2] : args[3]) : "");
                                    default : 
                                        throw new Error("error(Template): the parameter num is incorrect");
                                }
                            }catch(err){
                                switch(len){
                                    case 2 : 
                                        var p = _this.get(args[0]);
                                        return filter + (eval("'" + p + "'? '" + args[1] +"' : ''"));
                                    case 3 : 
                                        p = _this.get(args[0]);
                                        return filter + (eval("'" + p + "'? '" + args[1] + "':'" + args[2]+"'"));
                                    default : 
                                        throw new Error("error(Template): the parameter num is incorrect");
                                }
                            }
                        default :
                            //^f_ 处理函数
                            if(/^f_/.test(name)){
                                var f_name = (name && name.split("f_")[1]);
                                if(!(f_name && _this._funs[f_name])){
                                    throw new Error("error(Template): function "+f_name+" is not exists");
                                }
                                //var f_ = _this.get(args[0]);
                                return filter + _this._funs[f_name].apply(_this,args);
                            }
                    }
                });    
            }
            return _template;
        },
        get : function(key){
            if(key in this.params)
                return this.params[key];
            if(key in this._tmp_cache)
                return this._tmp_cache[key];
            return "";
        },
        encode : function(value){
            return encodeURIComponent(value);
        },
        trim : function(value){
            return value.trim();
        },
        trimHTML : function(value){
            return value.trimHtml()
        },
        fixed : function(value,len){
            return value.trancate(len);
        },
        //YY/YYYY MM DD hh mm ss (2011-08-26 16:10:06)
        date_format : function(datestr,reg){
            var tmp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(datestr);
            var Y = tmp[1],M = tmp[2],D = tmp[3],h = tmp[4],m = tmp[5],s = tmp[6];

            reg = reg || "hh:mm:ss";
        
            /ss/.test(reg) && (reg = reg.replace(/ss/,s)),
            /mm/.test(reg) && (reg = reg.replace(/mm/,m)),
            /hh/.test(reg) && (reg = reg.replace(/hh/,h)),
            /MM/.test(reg) && (reg = reg.replace(/MM/,M)),
            /DD/.test(reg) && (reg = reg.replace(/DD/,D)),
            /YYYY/.test(reg) && (reg = reg.replace(/YYYY/,Y)),
            /YY/.test(reg) && (reg = reg.replace(/YY/,Y.substring(2)));
            
            return reg;
        },
        time_format : function(time){
            var m = Math.floor(time / 60),
                    s = time % 60;
            if (s < 10) {
                s = '0' + s;
            }
            if(m > 60){
                var h = Math.floor(m / 60);
                m = m % 60;
                if(h < 10){
                    h = '0' + h;
                }
                if(m < 10){
                    m = '0' + m;
                }
                return h + ':' + m + ':' + s;
            }else{
                if(m < 10){
                    m = '0' + m;
                }
                return m + ':' + s;
            }
        }
        }
    });
});