'use strict';

app.controller('infoScreenController', ['$scope', '$rootScope', '$routeParams', 'countryService', function($scope, $rootScope, $routeParams, countryService) {

	$scope.infoShow = true;
	$scope.loading = true;
	$scope.country = null;

	$scope.tab = 'vf';

	$scope.close = function() {
		$scope.infoShow = false;
	};

	if ($routeParams.countryCode) {
		$rootScope.country = $rootScope.country || {};
		$rootScope.country.code = $routeParams.countryCode;
	}

	// Load actual data
	countryService.get({code: $routeParams.countryCode}).then(function(country) {
		$rootScope.country = $scope.country = country;
		$scope.loading = false;
	});
}]);