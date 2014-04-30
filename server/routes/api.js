'use strict';

/**
 * API routes.
 */

var mongoProxy = require('../lib/mongo-proxy');

/**
 * From country information.
 */
exports.from = function(req, res) {
	var params = {
		fo: true,
		q: {code: req.params.fromCountry}
	};
	mongoProxy('countries', params, req, res);
};

/**
 * Information about specific destination.
 */
exports.fromTo = function(req, res) {
	console.log('Params', req.params);
	res.send('From: ' + req.params.fromCountry + ', to: ' + req.params.toCountry);
};

/**
 * Unknown API requests respond with 404.
 */
exports.error = function(req, res) {
	res.send(404);
};