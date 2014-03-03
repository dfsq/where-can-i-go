/**
 * Simple Express server for the application.
 */
var express = require('express'),
	app = express();

// Development environment
app.configure('development', function() {
	app.use(express.static(__dirname + '/../app'));
	app.use(express.static(__dirname + '/../.tmp'));
});


// Server index.html for all requests
app.get('/', function(req, res) {
	res.sendfile('index.html');
});


// ... exceprt API
app.get('/api/from/:fromCountry', function(req, res) {
	console.log('Params', req.params);
	res.send('From: ' + req.params.fromCountry);
});


// Run server
app.listen(9000);
console.log('Server listening on port 9000');