'use strict';

app.directive('infoScreen', function() {
	return {
		controller: 'infoScreenController',
		link: function(scope, element) {
			console.log('info directive', element);
		}
	};
});