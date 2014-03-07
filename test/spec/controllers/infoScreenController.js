'use strict';

describe('Controller: infoScreenController', function () {

	var infoController,
		$rootScope,
		$scope,
		$httpBackend,
		routeParams;

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_, $injector) {

		routeParams = {
			countryCode: 'BY'
		};

		$httpBackend = $injector.get('$httpBackend');
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		// Set up mock http
		$httpBackend.when('GET', '/api/from/' + routeParams.countryCode).respond(
			{code: routeParams.countryCode, name: '???'}
		);

		infoController = $controller('infoScreenController', {
			$scope: $scope,
			$routeParams: routeParams
		});

		// Apply initial scope state
		$rootScope.$apply();
	}));


	it('should set property "loading" to "true" before request', function() {
		expect($scope.loading).toBeTruthy();
	});

	it('should load data for country defined by routeParams.countryCode', function() {

		expect($rootScope.country).toBeUndefined();
		$httpBackend.flush();

		expect($rootScope.country.code).toBe(routeParams.countryCode);
		expect($scope.country.code).toBe(routeParams.countryCode);
	});

	it('should set property "loading" to "false" after request', function() {
		$httpBackend.flush();
		expect($scope.loading).toBeFalsy();
	});

});
