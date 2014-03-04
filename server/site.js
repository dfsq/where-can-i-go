/**
 * Route for the main index.html path.
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	if (req.url !== '/') {
		res.redirect('/');
	}
//	var indexPath = require('path').resolve(__dirname + '/../app/index.html');
//	res.sendfile(indexPath);
};