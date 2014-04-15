'use strict';

/* global app: true */
var app = angular.module('whereCanIGo', [
	'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/from/:countryCode', {
			templateUrl: '/views/infoScreen.html',
			controller: 'infoScreenController'
		})
		.when('/from/:fromCountryCode/to/:toCountryCode', {
			template: 'from to country',
			controller: 'requirementsController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
}]);