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
			templateUrl: '/views/requirementsInfo.html',
			controller: 'requirementsInfoController',
			resolve: {
				fromCountry: ['$route', 'countryService', function($route, countryService) {
					return countryService.from({code: $route.current.params.fromCountryCode});
				}]
			}
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.infoShow = true;
		$rootScope.loading  = true;
	});
}]);