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
	}));


	it('should set property "loading" to "false"', function () {
		expect($rootScope.loading).toBeFalsy();
	});


	it('should watch $rootScope.country change, set loading=true and info={}', function() {

		// Apply initial scope state
		$rootScope.$apply();

		// Emulate country selection by user
		$rootScope.country = 'BY';
		$rootScope.$digest();

		expect($scope.loading).toBeTruthy();
		expect($scope.info).toEqual({});
	});

});
