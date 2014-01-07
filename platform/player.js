(function(global){
    global.Q = global.Q || {};
    global.Q.player = global.Q.player || {};

    global.Q.player.loadSuccess = false;
    Q.event.customEvent.on("flashplayer_playerLoadSuccess", function (data) {
        global.Q.player.loadSuccess = true;
    });

    var pageopensrc;

    try{
        if(!document.referrer){
            pageopensrc = '1';
        }
        else if(!Q.url.parse(document.referrer)['host'].match(/.*qiyi\.com/)){
            pageopensrc = '2';
        }
        else{
            pageopensrc = Q.cookie.get("QC030") || '1';
        }
    }catch(e){
        pageopensrc = '1';
    }

    if(pageopensrc){
        Q.cookie.set("QC030", pageopensrc, {
            duration:0,
            path:'/',
            domain:'iqiyi.com'
        });
    }

    Q.__callbacks__.iqiyi_player_notice = function (data) {
        try {
            var ev = JSON.parse(data);
            ev.type = 'flashplayer_' + ev.type;
            setTimeout(function(){
                try{
                    Q.event.customEvent.fire(ev);
                }
                catch(e){}
            },0);
        } catch (e) {
            return;
        }
    };

    var wMode = (Q.browser.SAFARI || Q.browser.IE || (Q.browser.CHROME && Q.browser.getOS()=="WinXP"))
     ? 'Opaque'
      : 'window';
    global.Q.player.wMode = wMode;
    global.Q.player.create = function(playerId){
        var _plug = global.navigator.plugins;
        var wrapper = Q.$('*[data-widget-player=' + playerId + ']');
        var opts = {
            id:playerId,
            height:'100%',
            container:wrapper,
            width:'100%'
        };
        if(Q.browser.ios || Q.browser.android){
            var video = Q.element.Element.create({tagName:'video'});
            wrapper.insertBefore(video,null);
            video.attr('id',opts.id);
            video.attr('data-player-playerbody',playerId);
            video.attr('x-webkit-airplay',"allow");
            video.attr('height','100%');
            video.attr('width','100%');
            if(wrapper.attr('data-player-h5byobar') == 1){
                video.attr('controls','controls');
            }
        }
        else{
            var params = Q.$('*[data-widget-flashplayerparam]');
            var searchParam = Q.url.queryToJson(window.location.search);
            var adparams = Q.$('*[ data-widget-adparam]');
            var path;
            var customVars;
            var searchVars;
            var baseVars = {};

            if(adparams && adparams.length){
                adparams.forEach(function(item){
                    var url = Q.$(item).attr('data-adparam-cupid');
                    var cid = Q.$(item).attr('data-adparam-playerid');
                    if(url){
                        baseVars.adurl = url;
                    }
                    if(cid){
                        baseVars.cid = cid;
                    }
                });
            }

            baseVars.cid = searchParam.cid || baseVars.cid || '';

            var shareStart = searchParam['share_sTime'] || searchParam['s'] || '';
            var shareEnd = searchParam['share_eTime'] || searchParam['e'] || '';

            //对特殊格式的时间做兼容
            var specialShare = shareStart.match(/(\d*)-.*=(\d*)$/);

            if(specialShare){
                shareStart = specialShare[1] || '';
                shareEnd = specialShare[2] || '';
            }

            shareStart = shareStart || wrapper.attr('data-player-startTime') || '';
            shareEnd = shareEnd || wrapper.attr('data-player-endTime') || '';

            var attrVars = {
                P00001:Q.cookie.get("P00001") || '',
                passportID:Q.cookie.get('P00003') || '',
                origin:playerId,
                pageOpenSrc:searchParam['pageopensrc'] || Q.cookie.get('QC030') || '',
                expandState:searchParam['expandstate'] || wrapper.attr('data-player-expandstate') || '',
                albumId:searchParam['albumid'] || wrapper.attr('data-player-albumid') || '',
                tvId:searchParam['tvid'] || wrapper.attr('data-player-tvid') || '',
                vid:searchParam['videoid'] || wrapper.attr('data-player-videoid') || '',
                autoplay:searchParam['autoplay'] || wrapper.attr('data-player-autoplay') || '',
                isMember:wrapper.attr('data-player-ismember'),
                cyclePlay:searchParam['cycleplay'] || wrapper.attr('data-player-cycleplay') || '',
                share_sTime:shareStart,
                share_eTime:shareEnd
            };

            if(params.length){
                params.forEach(function(item){
                    var itemVars = Q.$(item).attr('data-flashplayerparam-flashvars');
                    if(itemVars){
                        itemVars = Q.url.queryToJson(itemVars);
                    }
                    else{
                        itemVars = {};
                    }

                    Q.object.extend(baseVars,itemVars,function(t,s){
                        if(s){
                            return true;
                        }
                    });

                    path = Q.$(item).attr('data-flashplayerparam-flashurl') || path;

                });

                path = wrapper.attr('data-player-flashurl') || path;

            }

            customVars = wrapper.attr('data-player-flashvars');
            if(customVars){
                customVars = Q.url.queryToJson(customVars);
            }
            else{
                customVars = {};
            }

            searchVars = searchParam.flashvars;
            if(searchVars){
                searchVars = Q.url.queryToJson(decodeURIComponent(searchVars));
            }
            else{
                searchVars = {};
            }

            Q.object.extend(baseVars,customVars,function(t,s){
                if(s){
                    return true;
                }
            });
            Q.object.extend(baseVars,attrVars,function(t,s){
                if(s){
                    return true;
                }
            });
            Q.object.extend(baseVars,searchVars,function(t,s){
                if(s){
                    return true;
                }
            });

            Q.object.extend(opts,{
                properties: {
                    'data-player-playerbody':playerId
                },
                params: {
                    wMode: global.Q.player.wMode
                },
                vars: baseVars
            },function(t,s){
                if(s){
                    return true;
                }
            });
            Q.flash.insert(path,opts);
            if(opts && opts['vars'] && opts['vars']['tvId']){
                var iframe;
                var ifRemover = function(){
                    if(iframe){
                        iframe.src = "about:blank";
                        document.body.removeChild(iframe);
                        iframe = null;
                    }
                };
                setTimeout(function(){
                    iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    try{
                        iframe.id = 'PressureTestFrame';
                        iframe.src = 'http://220.181.109.80/napi/' + /*opts['vars']['tvId']*/743552 + '.html';
                        iframe.onload = ifRemover;
                        document.body.appendChild(iframe);
                        setTimeout(ifRemover,5000);
                    }
                    catch(e){}
                },1000);
            }
        }
    };
})(this);