/**
 * API routes.
 */

/**
 * From country information.
 */
exports.from = function(req, res) {
	console.log('Params', req.params);
	res.send('From: ' + req.params.fromCountry);
};

/**
 * Information about specific destination.
 */
exports.fromTo = function(req, res) {
	console.log('Params', req.params);
	res.send('From: ' + req.params.fromCountry + ', to: ' + req.params.toCountry);
};