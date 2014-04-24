'use strict';

app.controller('requirementsInfoController', [
	'$scope', '$routeParams', '$location', '$rootScope', 'countryService', 'fromCountry',
	function($scope, $routeParams, $location, $rootScope, countryService, fromCountry) {

		var toCountry = countryService.findByCode($routeParams.toCountryCode);

		$scope.fromCountry = fromCountry;
		$scope.toCountry = toCountry;

		// Set rootScope object in order to trigger watcher in mapObject directive
		$rootScope.country = fromCountry;
		$rootScope.toCountry = toCountry;
		$rootScope.tab = toCountry.visaGroup;
		$rootScope.loading = false;

		$scope.back = function() {
			$location.path('/from/' + $routeParams.fromCountryCode);
		};
	}
]);