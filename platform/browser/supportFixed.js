define(function(require,exports,module){
	var ua = require('../browser/ua');
	
	var suppordFixed =  (ua.ios && parseFloat(ua.version) >= 5) || (ua.android && parseFloat(ua.version) > 2.1);
	
    module.exports = suppordFixed;
});