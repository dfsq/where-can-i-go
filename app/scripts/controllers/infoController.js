'use strict';

app.controller('infoController', ['$scope', '$rootScope', function($scope, $rootScope) {

	window.rootScope = $rootScope;
	window.scope = $scope;

	$scope.loading = false;

	$rootScope.$watch('country', function(newCountry, oldCountry) {
		if (newCountry !== oldCountry) {
			$scope.loading = true;
			loadInfo(newCountry);
		}
	});

	function loadInfo(newCountry) {
		$scope.info = {};
	}
}]);