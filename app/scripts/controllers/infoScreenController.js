'use strict';

app.controller('infoScreenController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', 'countryService',
function($scope, $rootScope, $routeParams, $location, $timeout, countryService) {

	$scope.infoShow = true;
	$scope.loading = true;
	$scope.country = null;

	// If comming from from/to screen $rootScope.tab will be already set
	if (!$rootScope.tab) {
		$rootScope.tab = $scope.tab = 'vf';
	}

	$scope.close = function() {
		$scope.infoShow = false;
		$timeout(function() {
			$location.path('/');
		}, 400);
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