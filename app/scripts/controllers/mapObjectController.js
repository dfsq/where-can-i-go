'use strict';

app.controller('mapObjectController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	$scope.onCountrySelect = function(countryCode) {
		$rootScope.$apply(function() {
			$location.path('/from/' + countryCode);
		});
	};
}]);