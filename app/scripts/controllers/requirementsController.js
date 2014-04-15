'use strict';

app.controller('requirementsController', ['$scope', '$routeParams', 'countryService',
	function($scope, $routeParams, countryService) {

		var from = $routeParams.fromCountryCode,
			to   = $routeParams.toCountryCode;

		console.log(from, to);
	}
]);