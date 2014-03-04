/**
 * Simple Express server for the application.
 */
var express = require('express'),
	site = require('./site'),
	api = require('./api'),
	app = express();


// Development environment
app.configure('development', function() {
	app.use(express.static(__dirname + '/../app'));
	app.use(express.static(__dirname + '/../.tmp'));
});

// Common index route
app.get(/^((?!\/api\/).)*$/, site.index);

// API routes
app.get('/api/from/:fromCountry', api.from);
app.get('/api/from/:fromCountry/to/:toCountry', api.fromTo);


// Run server
app.listen(9000);
console.log('Server listening on port 9000');