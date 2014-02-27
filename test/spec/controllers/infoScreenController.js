'use strict';

describe('Controller: infoScreenController', function () {

	var infoController,
		$rootScope,
		$scope,
		$httpBackend;

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_, $injector) {

		$httpBackend = $injector.get('$httpBackend');

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		// Set up mock http
		$httpBackend.when('GET', '/from/BY').respond(
			{code: 'BY', name: 'Belarus'}
		);

		infoController = $controller('infoScreenController', {
			$scope: $scope,
			$routeParams: {countryCode: 'BY'}
		});

		// Apply initial scope state
		$rootScope.$apply();
	}));


	it('should set property "loading" to "true"', function () {
		expect($scope.loading).toBeTruthy();
	});

	it('should load data for country code BY', function() {
		$httpBackend.flush();
		expect($rootScope.country.code).toBe('BY');
	});

});
