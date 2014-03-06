/**
 * Simple Express server for the application.
 */
var express = require('express'),
	path = require('path'),
	config = require('./config'),
	site = require('./site'),
	api = require('./api'),
	app = express();


// Development environment
app.configure('development', function() {
	app.use(express.static(config.server.appPath));
	app.use(express.static(config.server.assetsPath));
});


// API routes
app.get('/api/from/:fromCountry', api.from);
app.get('/api/from/:fromCountry/to/:toCountry', api.fromTo);

// All undefined api routes should return a 404
app.get('/api/*', api.error);

// For all other requests serve index.html
app.get('/*', site.index);


// Run server
app.listen(config.server.port);
console.log('Server listening on port ' + config.server.port);