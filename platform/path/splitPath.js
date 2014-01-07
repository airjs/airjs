define(function(require,exports,module){

	var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:[\s\S]+?)?(\.[^.]*)?)$/;
	var splitPath = function(filename) {
		var result = splitPathRe.exec(filename);
		return [result[1] || '', result[2] || '', result[3] || '', result[4] || ''];
	};

    module.exports = splitPath;
});