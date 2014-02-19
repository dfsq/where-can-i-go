'use strict';

app.controller('mapObjectController', ['$scope', '$rootScope', '$location', 'countryService', function($scope, $rootScope, $location, countryService) {
	$scope.onCountrySelect = function(countryCode) {
		$rootScope.$apply(function() {
			$location.path('/from/' + countryCode);
		});
	};
}]);