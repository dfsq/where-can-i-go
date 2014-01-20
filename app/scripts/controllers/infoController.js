'use strict';

app.controller('infoController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.loading = false;

	$rootScope.$watch(function() { return $rootScope.country; }, function(newCountry, oldCountry) {
		if (newCountry !== oldCountry) {
			$scope.loading = true;
			loadInfo(newCountry);
		}
	});

	function loadInfo(newCountry) {
		$scope.info = {};
	}
}]);