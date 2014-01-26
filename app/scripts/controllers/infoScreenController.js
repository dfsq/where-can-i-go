'use strict';

app.controller('infoScreenController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$rootScope.loading = false;

	$rootScope.$watch('country', function(newCountry, oldCountry) {
		if (newCountry !== oldCountry) {
			loadInfo(newCountry);
		}
	}, true);

	function loadInfo(newCountry) {
		$scope.info = {};
	}
}]);