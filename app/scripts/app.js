'use strict';

/* global app: true */
var app = angular.module('whereCanIGo', [
	'ngRoute'
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/from/:countryCode', {
			templateUrl: 'views/country.html',
			controller: 'infoScreenController'
		})
		.otherwise({
			redirectTo: '/'
		});
});