'use strict';

app.controller('requirementsInfoController', [
	'$scope', '$routeParams', '$window', 'countryService', 'fromCountry',
	function($scope, $routeParams, $window, countryService, fromCountry) {

		$scope.fromCountry = fromCountry;
		$scope.toCountry = countryService.findByCode($routeParams.toCountryCode);

		$scope.back = function() {
			$window.history.back();
		};
	}
]);