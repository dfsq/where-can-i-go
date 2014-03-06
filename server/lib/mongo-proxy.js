/**
 * Proxy layer for MongoLab database.
 */
var url = require('url'),
	https = require('https');

module.exports = function(req, res) {

	res.send('From: ' + req.params.fromCountry);

	var options = {
		hostname: ''
	};

	return;

	try {
		var request = https.request(options, function(req, res) {

		});
		request.end(JSON.stringify(req.body));
	}
	catch (error) {
		console.log('ERROR: ', error.stack);
		res.json(error);
		res.end();
	}

};