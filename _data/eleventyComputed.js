const fs = require("fs")
module.exports = {
	created: function(data) {
		const path = data?.page?.inputPath;
		return path
			? fs.statSync(path).birthtime
			: undefined;
	},
	modified: function(data) {
		const path = data?.page?.inputPath;
		return path
			? fs.statSync(path).mtime
			: undefined;
	}
};