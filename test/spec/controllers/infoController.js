'use strict';

describe('Controller: infoController', function () {

	var infoController,
		$rootScope,
		$scope;

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_) {

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		infoController = $controller('infoController', {
			$scope: $scope
		});

		// Apply initial scope state
		$rootScope.$apply();
	}));


	it('should set property "loading" to "false"', function () {
		expect($rootScope.loading).toBeFalsy();
	});


	it('should set loading=true on $rootScope.country change', function() {

		// Emulate country selection by user
		$rootScope.country = 'BY';
		$rootScope.$digest();

		expect($scope.loading).toBeTruthy();
	});

	it('should set scope.info={} on $rootScope.country change', function() {

		// Emulate country selection by user
		$rootScope.country = 'BY';
		$rootScope.$digest();

		expect($scope.info).toEqual({});
	});

});
