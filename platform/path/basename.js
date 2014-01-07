define(function(require,exports,module){

	var splitPath = require('./splitPath');

	module.exports = function(path,ext) {
		var f = splitPath(path)[2];
		// TODO: make this comparison case-insensitive on windows?
		if (ext && f.substr(-1 * ext.length) === ext) {
			f = f.substr(0, f.length - ext.length);
		}
		return f;
	};
});