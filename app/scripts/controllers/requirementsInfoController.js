'use strict';

app.controller('requirementsInfoController', ['$scope', '$routeParams', '$window', '$rootScope', 'countryService',
	function($scope, $routeParams, $window, $rootScope, countryService) {

		var from = $routeParams.fromCountryCode,
			to   = $routeParams.toCountryCode;

		$scope.country = {name: to};

		window.scope = $rootScope;


		$scope.back = function() {
			$window.history.back();
		};

	}
]);