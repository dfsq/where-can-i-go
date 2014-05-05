'use strict';

describe('Controller: infoScreenController', function() {

	var infoController,
		$controller,
		$rootScope,
		$scope,
		$httpBackend,
		$location,
		$timeout,
		routeParams;

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($injector) {

		routeParams = {
			countryCode: 'BY'
		};

		$controller = $injector.get('$controller');
		$httpBackend = $injector.get('$httpBackend');
		$location = $injector.get('$location');
		$timeout = $injector.get('$timeout');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		// Set up mock http
		$httpBackend.when('GET', '/api/from/' + routeParams.countryCode).respond(
			{code: routeParams.countryCode}
		);

		infoController = $controller('infoScreenController', {
			$scope: $scope,
			$routeParams: routeParams,
			$timeout: $timeout
		});

		// Apply initial scope state
		$rootScope.$apply();
	}));


	it('should set property "loading" to "true" before request for "slide" screens', function() {
		$rootScope.$broadcast('$routeChangeStart', {className: 'slide'});
		expect($rootScope.loading).toBe(true);
	});

	it('should load data for country defined by routeParams.countryCode', function() {

		expect($rootScope.country).toBeUndefined();
		$httpBackend.flush();

		expect($rootScope.country.code).toBe(routeParams.countryCode);
		expect($scope.country.code).toBe(routeParams.countryCode);
	});

	it('should set property "loading" to "false" after request', function() {
		$httpBackend.flush();
		expect($rootScope.loading).toBeFalsy();
	});

	it('should change $location.path to "/" and $scope.infoShow to "false" on infoScreen close', function() {
		$location.path('/from/BY');
		$scope.close();
		$timeout.flush();
		expect($location.path()).toBe('/');
	});

});
