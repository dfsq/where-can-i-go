'use strict';

app.controller('mapObjectController', ['$scope', '$rootScope', 'countryService', function($scope, $rootScope, countryService) {

	$scope.onCountrySelect = function(query) {

		$rootScope.loading = true;

		return countryService.get(query).then(function(response) {
			return response.data;
		})
		.then(function(data) {
			$rootScope.country = data;
		});
	};
}]);