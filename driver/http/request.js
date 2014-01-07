define(function(require,exports,module){
    var http = require("http");
    var url = require('url');
    var path = require('path');
    var extend = require('../../platform/object/extend');
    var fs = require('fs');
    var zlib = require('zlib');

    var processBuffer = function(buffers,buffer){
        var pos = 0;
        for(var i = 0, l = buffers.length; i < l; i++) {
            buffers[i].copy(buffer, pos);
            pos += buffers[i].length;
        }
        var destBuffer = buffer;
        return destBuffer;
    }

    var processSuccess = function(fn,options){
        if(fn){
            fn({
                getResponseHeader:function(name){
                    return options.res.headers[name.toLowerCase()];
                },
                status:options.res.statusCode
            },options.body);
        }
    }

    module.exports = function(destUrl,options){
        var oUrl = url.parse(destUrl);
        options = options || {};
        options.method = options.method || 'GET';
        var requestParam = extend(oUrl,{
            method:options.method,
            headers:options.headers || {}
        });
        if(options.method.toUpperCase() == 'GET'){
            var req = http.get(requestParam,function(res){
                var body = '',buffers = [],size = 0;
                res.on('data',function(buffer){
                    buffers.push(buffer);
                    size += buffer.length;
                });
                res.on('end',function(){
                    var buffer = new Buffer(size);
                    body = processBuffer(buffers,buffer);
                    var encoding = res.headers['content-encoding'];
                    var status = parseInt(res.statusCode);
                    if(status >= 200 && status < 400){
                        switch (encoding) {
                            case 'gzip':
                                zlib.gunzip(body,function(err,body){
                                    processSuccess(options.onsuccess,{
                                        res:res,
                                        body:body
                                    });
                                });
                                break;
                            default:
                                processSuccess(options.onsuccess,{
                                    res:res,
                                    body:body
                                });
                                break;
                        }
                    }
                    else{
                        if(options.onfailure){
                            options.onfailure({
                                message:'http status code : ' + status
                            });
                        }
                    }
                });
            });
            req.on('error',function(e){
                if(options.onfailure){
                    options.onfailure({
                        message:e.message
                    });
                }
            });
            return {
                abort:function(){
                    req.abort();
                }
            };
        }
        else if(options.method.toUpperCase() == 'POST'){
            var req = http.request(requestParam,function(res){
                var body = '',buffers = [],size = 0;
                res.on('data', function (buffer) {
                    buffers.push(buffer);
                    size += buffer.length;
                });
                res.on('end',function(){
                    var buffer = new Buffer(size);
                    body = processBuffer(buffers,buffer);
                    var status = parseInt(res.statusCode);
                    if(status >= 200 && status < 400){
                        processSuccess(options.onsuccess,{
                            res:res,
                            body:body
                        });
                    }
                    else{
                        if(options.onfailure){
                            options.onfailure({
                                message:'http status code : ' + status
                            });
                        }
                    }
                });
            });
            req.on('error',function(e){
                if(options.onfailure){
                    options.onfailure({
                        message:e.message
                    });
                }
            });
            if(options.data){
                req.write(options.data + '\n');
                req.end('\n');
            }
            if(options.file){
                var boundaryKey = options.file.boundary;
                var filename = path.basename(options.file.path);
                var queryname = options.file.query;
                req.write(
                    '--' + boundaryKey + '\r\n' + 
                    'Content-Disposition: form-data; name="' + queryname + '"; filename="' + filename + '"\r\n' +
                    'Content-Type: ' + options.file.contentType + '\r\n\r\n'
                );
                //设置1M的缓冲区
                var fileStream = fs.createReadStream(options.file.path,{bufferSize:1024 * 1024});
                fileStream.pipe(req,{end:false});
                fileStream.on('end',function(){
                    req.end('\r\n--' + boundaryKey + '--');
                });
            }
        }
    };
});