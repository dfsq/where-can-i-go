'use strict';

/* global app: true */
var app = angular.module('whereCanIGo', [
	'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			controller: function() {},
			template: ''
		})
		.when('/from/:countryCode', {
			templateUrl: '/views/infoScreen.html',
			controller: 'infoScreenController',
			className: 'slide'
		})
		.when('/from/:fromCountryCode/to/:toCountryCode', {
			templateUrl: '/views/requirementsInfo.html',
			controller: 'requirementsInfoController',
			resolve: {
				fromCountry: ['$route', 'countryService', function($route, countryService) {
					return countryService.from({code: $route.current.params.fromCountryCode});
				}]
			},
			className: 'slide'
		})
		.when('/about', {
			controller: 'aboutController',
			templateUrl: 'views/about.html',
			className: 'fade'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$route', function($rootScope) {

	// TODO: Move infoShow and loading to controllers, about page doesn't need it
	$rootScope.$on('$routeChangeStart', function(scope, next) {
console.log('TEST', next.className);
		// Route definition className determines animation ngView type
		$rootScope.showEffect = next.className;

		if (next.className === 'slide') {
			$rootScope.infoShow = true;
			$rootScope.loading  = true;
		}
	});
}]);