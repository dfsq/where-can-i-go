'use strict';

app.directive('infoScreen', function() {
	return {
		controller: 'infoScreenController',
		link: function(scope, element) {
			console.log('info directive', element);

			/*
			element.find('.country').on('click', function() {
				// highlight country on the map and display additional visa requirements
			})
			*/
		}
	};
});