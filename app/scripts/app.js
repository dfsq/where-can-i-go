'use strict';

/* global app: true */
var app = angular.module('whereCanIGo', [
	'ngRoute'
]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/from/:countryCode', {
			templateUrl: '/views/destinationsInfo.html',
			controller: 'infoScreenController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
});