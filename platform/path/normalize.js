define(function(require,exports,module){

  var normalizeArray = require('./normalizeArray');
  
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?([\s\S]*?)$/;

  module.exports = function(path,isWindows) {
    if(isWindows){
      var result = splitDeviceRe.exec(path),
          device = result[1] || '',
          isUnc = device && device.charAt(1) !== ':',
          isAbsolute = !!result[2] || isUnc, // UNC paths are always absolute
          tail = result[3],
          trailingSlash = /[\\\/]$/.test(tail);

      // Normalize the tail path
      tail = normalizeArray(tail.split(/[\\\/]+/).filter(function(p) {
        return !!p;
      }), !isAbsolute).join('\\');

      if (!tail && !isAbsolute) {
        tail = '.';
      }
      if (tail && trailingSlash) {
        tail += '\\';
      }

      // Convert slashes to backslashes when `device` points to an UNC root.
      device = device.replace(/\//g, '\\');

      return device + (isAbsolute ? '\\' : '') + tail;
    }
    else{
      var isAbsolute = path.charAt(0) === '/',
          trailingSlash = path.slice(-1) === '/';

      // Normalize the path
      path = normalizeArray(path.split('/').filter(function(p) {
        return !!p;
      }), !isAbsolute).join('/');

      if (!path && !isAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }

      return (isAbsolute ? '/' : '') + path;
    }
  };
});