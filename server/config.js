var path = require('path');

module.exports = {
	server: {
		port: process.env.PORT || 9000,
		appPath: path.join(__dirname, '..', 'app'),
		assetsPath: path.join(__dirname, '..', '.tmp')
	},
	mongo: {
		dbUrl: 'https://api.mongolab.com/api/1',
		dbPath: '/databases/wherecanigo/collections',
		apiKey: 'IXGMQbrk_gGDz-BsX-CCcYAsfEEcsuI3'
	}
};