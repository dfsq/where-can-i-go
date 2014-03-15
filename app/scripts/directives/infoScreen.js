'use strict';

app.directive('infoScreen', function() {
	return {
		link: function(scope, element) {

			console.log('Link InfoScreen directive', element);

			// TODO: Highlight currently selected country by clicking, show details?
			element.on('click', function(e) {
				var target = angular.element(e.target);
				if (!target.hasClass('country')) {
					return;
				}
				console.log('country', target.text());
			});
		}
	};
});
