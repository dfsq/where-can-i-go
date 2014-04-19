'use strict';

app.controller('requirementsInfoController', [
	'$scope', '$routeParams', '$window', '$rootScope', 'countryService', 'fromCountry',
	function($scope, $routeParams, $window, $rootScope, countryService, fromCountry) {

		var toCountry = countryService.findByCode($routeParams.toCountryCode);

		$scope.fromCountry = fromCountry;
		$scope.toCountry = toCountry;

		// Set rootScope object in order to trigger watcher in mapObject directive
		$rootScope.country = fromCountry;
		$rootScope.tab = toCountry.visaGroup;

		$scope.back = function() {
			$window.history.back();
		};
	}
]);