'use strict';

app.controller('requirementsInfoController', ['$scope', '$routeParams', '$window', '$rootScope', 'countryService',
	function($scope, $routeParams, $window, $rootScope, countryService) {

		var from = $routeParams.fromCountryCode,
			to   = $routeParams.toCountryCode;

		$scope.back = function() {
			$window.history.back();
		};

		countryService.from({code: from}).then(function(data) {
			$rootScope.country = data;
		});
	}
]);