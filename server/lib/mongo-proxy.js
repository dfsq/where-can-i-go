'use strict';

/**
 * Proxy layer for MongoLab database.
 */
var url = require('url'),
	queryString = require('querystring'),
	https = require('https'),
	config = require('../config');

module.exports = function(collection, params, req, res) {

	var basePath = url.parse(config.mongo.dbUrl);

	// Pass apikey with params
	params.apiKey = config.mongo.apiKey;
	params.q = JSON.stringify(params.q);

	var options = {
		hostname: basePath.hostname,
		protocol: basePath.protocol,
		path: basePath.path + config.mongo.dbPath + '/' + collection + '?' + queryString.stringify(params),
		method: 'GET'
	};

	try {

		var request = https.request(options, function(requestRes) {

			var data = '';

			res.headers = requestRes.headers;
			requestRes.setEncoding('utf8');

			requestRes.on('data', function(chunk) {
				data = data + chunk;
			});

			requestRes.on('end', function() {
				res.header('Content-Type', 'application/json');
				res.statusCode = requestRes.statusCode;
				res.httpVersion = requestRes.httpVersion;
				res.trailers = requestRes.trailers;
				res.send(data);
				res.end();
			});
		});

		request.end();

	}
	catch (error) {
		console.log('ERROR: ', error.stack);
		res.json(error);
		res.end();
	}

};