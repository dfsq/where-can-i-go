'use strict';

app.controller('mapObjectController', ['$scope', '$rootScope', 'countryService', function($scope, $rootScope, countryService) {

	$scope.onCountrySelect = function(query) {

		// Notify infoScreenController
		$rootScope.$emit('countrySelect');

		// Load actual data
		return countryService.get(query).then(function(response) {
			return response.data;
		})
		.then(function(data) {
			$rootScope.$emit('countryLoaded', data);
		});
	};
}]);