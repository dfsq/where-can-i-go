'use strict';

app.directive('infoScreen', function() {
	return {
		controller: 'infoController',
		link: function(scope, element) {
			console.log('info directive', element);
		}
	};
});