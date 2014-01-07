define(function(require,exports,module){

	var splitPath = require('./splitPath');

	module.exports = function(path) {
		var result = splitPath(path),
			root = result[0],
			dir = result[1];

		if (!root && !dir) {
			// No dirname whatsoever
			return '.';
		}

		if (dir) {
			// It has a dirname, strip trailing slash
			dir = dir.substring(0, dir.length - 1);
		}
		return root + dir;
	};
});