'use strict';

app.controller('infoScreenController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.infoShow = false;
	$scope.loading = false;
	$scope.country = null;

	$rootScope.$on('countrySelect', function() {
		$scope.infoShow = true;
		$scope.loading = true;
	});

	$rootScope.$on('countryLoaded', function(e, country) {
		$scope.loading = false;
		$scope.country = country;
	});

	$scope.close = function() {
		$rootScope.infoShow = false;
	};
}]);