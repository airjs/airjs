//Qiyi plugin
(function(host, global) {
    global.Qiyi = global.Qiyi || {};
    var backupQ = global.Q;
    global.Q = global.Qiyi;

    var siteDomain = (function(w){
        var domainLevel = 2;
        var domains = w.location.hostname.split(".");
        domains = domains.slice(domains.length - domainLevel);
        return domains.join(".");
    })(global);

    global.Qiyi.siteDomain = siteDomain;

    try{
        global.document.domain = siteDomain;
    }
    catch(e){}

    var verurl, liburl, protocol = window.location.protocol;
    Qiyi.noConflict = function() {
        global.Q = backupQ;
    };
    Qiyi.ready = function(callback) {
        liburl = Q.liburl || (protocol + '//static.iqiyi.com/js/lib/lib');
        seajs.use(liburl, callback || function() {});
    };
    Qiyi.PageInfo = {};
    var targets = ['onload','domready','jsloaded','jobdone'];
    var lefts = [].concat(targets);
    var loadtime = {};
    var serverLogimgList = {};
    Qiyi.LoadTime = {
        add:function(data){
            if(typeof data == 'string'){
                if(targets.indexOf(data) == -1){
                    targets.push(data);
                    lefts.push(data);
                }
            }
            else if(Q.array.isArray(data)){
                data.forEach(function(name){
                    if(targets.indexOf(name) == -1){
                        targets.push(name);
                        lefts.push(name);
                    }
                });
            }
        },
        reset:function(arr){
            //可以用定制的指标数组覆盖默认指标数组
            arr = arr || targets;
            lefts = [];
            loadtime = {};
            lefts = lefts.concat(arr);
        },
        loaded:function(name){
            var index = lefts.indexOf(name);
            if(index != -1 && Q.PageInfo && Q.PageInfo.page_begin){
                var time = new Date();
                loadtime[name] = time - Q.PageInfo.page_begin;
                lefts.splice(index,1);
            }
            if(lefts.length === 0){
                this._log(loadtime);
            }
        },
        _log:function(param){
            //暂时只发手机端数据
            if(Q.browser && (Q.browser.WP || Q.browser.android || Q.browser.iPhone)){
                var url = 'http://msg.iqiyi.com/b';
                if(param){
                    param.t = '11';
                    param.ct = 'h5inttest';
                    param.pf = '2';
                    param.p = '20';
                    param.p1 = '201';
                    var pmap = {
                        'domready':'tm1',
                        'onload':'tm2',
                        'jsloaded':'tm3',
                        'jobdone':'tm4',
                        'videoready':'tm5'
                    };
                    var img = new Image();
                    var key = 'slog_' + Math.floor(Math.random() * 2147483648).toString(36);
                    serverLogimgList[key] = img;
                    img.onload = img.onerror = img.onabort = function(){
                        img.onload = img.onerror = img.onabort = null;
                        serverLogimgList[key] = null;
                        delete serverLogimgList[key];
                        img = null;
                    };
                    var params = [];
                    param.rn = Math.round(Math.random() * 2147483647);
                    for(var pname in param){
                        var pvalue = param[pname];
                        if(pmap[pname]){
                            pname = pmap[pname];
                        }
                        params.push(pname + '=' + encodeURIComponent(pvalue));
                    }
                    img.src = url + '?' + params.join('&');
                }
            }
        }
    };
    Qiyi.load = function(jobName, callback) {
        var projectName = Qiyi.projectName || '';
        var rnd = parseInt(Math.random()*1E10,10).toString(36);
        verurl = Q.verurl || (protocol + '//static.iqiyi.com/js/' + Qiyi.projectName + '/ver.js?' + rnd);
        if(!projectName) {
            throw new Error('未指定projectName');
        }
        Qiyi.ready(function(lib) {
            seajs.use(verurl, function(ver) {
                ver.loadJob(jobName, function(pageJob) {
                    Qiyi.LoadTime.loaded('jsloaded');
                    if(pageJob && pageJob.addJobs) {
                        pageJob.addJobs();
                    }
                    if(pageJob && pageJob.start) {
                        pageJob.start();
                        Qiyi.LoadTime.loaded('jobdone');
                    }
                    if(callback){
                        callback();
                    }
                });
            });
        });

        if(Q.log && Q.log.server){
            setTimeout(function(){
                Q.log.server({
                    type:"piaoshhtestmayttf",
                    job:(jobName || '').toLowerCase(),
                    des:'findpagebyjob',
                    url:window.location.href,
                    entry:'Q.load',
                    prj:projectName || ''
                }, 'http://msg.video.qiyi.com/tmpstats.gif');
            },0);
        }
    };


    //Dom Ready
    var ready = (function() {
            var readyBound = false,
                readyList = [],
                DOMContentLoaded;

            if(document.addEventListener) {
                DOMContentLoaded = function() {
                    document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
                    ready();
                };

            }
            else if(document.attachEvent) {
                DOMContentLoaded = function() {
                    if(document.readyState === 'complete') {
                        document.detachEvent('onreadystatechange', DOMContentLoaded);
                        ready();
                    }
                };
            }

            function ready() {
                if(!ready.isReady) {
                    ready.isReady = true;
                    for(var i = 0, j = readyList.length; i < j; i++) {
                        readyList[i]();
                    }
                }
            }

            function doScrollCheck() {
                try {
                    document.documentElement.doScroll("left");
                } catch(e) {
                    setTimeout(doScrollCheck, 1);
                    return;
                }
                ready();
            }

            function bindReady() {
                if(readyBound) {
                    return;
                }
                readyBound = true;

                if(document.readyState === 'complete') {
                    ready.isReady = true;
                }
                else {
                    if(document.addEventListener) {
                        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
                        window.addEventListener('load', ready, false);
                    }
                    else if(document.attachEvent) {
                        document.attachEvent('onreadystatechange', DOMContentLoaded);
                        window.attachEvent('onload', ready);

                        var toplevel = false;

                        try {
                            toplevel = window.frameElement === null;
                        } catch(e) {}

                        if(document.documentElement.doScroll && toplevel) {
                            doScrollCheck();
                        }
                    }
                }
            }
            bindReady();

            return function(callback) {
                if(ready.isReady){
                    callback();
                }
                else{
                    readyList.push(callback);
                }
            };
        })();

    ready.isReady = false;
    ready(function() {
        Q.LoadTime.loaded('domready');
        Q.ready(function() {
            Q.$(window).on('load',function(){
                Q.LoadTime.loaded('onload');
            });
        });
    });
})(seajs, this);