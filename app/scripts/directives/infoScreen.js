'use strict';

app.directive('infoScreen', ['$rootScope', function($rootScope) {
	return {
		link: function(scope, element) {
			element.on('click', function(e) {
				var target = angular.element(e.target);
				if (!target.hasClass('country')) {
					return;
				}
				console.log('country', target);
			});
		}
	};
}]);
