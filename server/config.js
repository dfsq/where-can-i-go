var path = require('path');

module.exports = {
	server: {
		port: 9000,
		appPath: path.join(__dirname, '..', 'app'),
		assetsPath: path.join(__dirname, '..', '.tmp')
	}
};