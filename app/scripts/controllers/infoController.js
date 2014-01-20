'use strict';

app.controller('infoController', ['$scope', '$rootScope', 'countryService', function($scope, $rootScope, countryService) {

	$scope.loading = false;

	$rootScope.$watch('country', function(newCountry, oldCountry) {
		console.log(newCountry, oldCountry);
		if (newCountry !== oldCountry) {
			$scope.loading = true;
			loadInfo(newCountry);
		}
	});

	function loadInfo(newCountry) {
		$scope.info = {};
	}
}]);