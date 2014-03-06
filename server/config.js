var path = require('path');

module.exports = {
	server: {
		port: 9000,
		appPath: path.join(__dirname, '..', 'app'),
		assetsPath: path.join(__dirname, '..', '.tmp')
	},
	mongo: {
		dbUrl: 'https://api.mongolab.com/api/1',
		apiKey: 'IXGMQbrk_gGDz-BsX-CCcYAsfEEcsuI3'
	}
};