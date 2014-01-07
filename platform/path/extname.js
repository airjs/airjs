define(function(require,exports,module){

	var splitPath = require('./splitPath');

	module.exports = function(path) {
		return splitPath(path)[3];
	};
});