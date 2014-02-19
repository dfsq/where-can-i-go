'use strict';

app.directive('infoScreen', function() {
	return {
		templateUrl: 'views/infoScreen.html',
		link: function(scope, element) {
			console.log('info directive', element);
		}
	};
});
