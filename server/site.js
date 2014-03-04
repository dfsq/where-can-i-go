/**
 * Route for the main index.html path.
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	res.sendfile(require('path').resolve(__dirname + '/../app/index.html'));
};