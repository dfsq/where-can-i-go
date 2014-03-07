'use strict';

app.controller('infoScreenController', ['$scope', '$rootScope', '$routeParams', 'countryService', function($scope, $rootScope, $routeParams, countryService) {

	$scope.infoShow = true;
	$scope.loading = true;
	$scope.country = null;

	$rootScope.tab = $scope.tab = 'vf';

	$scope.close = function() {
		$scope.infoShow = false;
	};

	$scope.setTab = function(tab) {
		$scope.tab = tab;
		$rootScope.tab = tab;
	};

	// Load actual data
	countryService.from({code: $routeParams.countryCode}).then(function(country) {
		$rootScope.country = $scope.country = country;
		$scope.loading = false;
	});
}]);