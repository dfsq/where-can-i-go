'use strict';

describe('Controller: infoController', function () {

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	var infoController,
		$rootScope,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_) {
		$rootScope = _$rootScope_;
		scope = _$rootScope_.$new();
		infoController = $controller('infoController', {
			$scope: scope
		});
	}));


	it('should set property "loading" to "false"', function () {
		expect($rootScope.loading).toBeFalsy();
	});


	it('should watch $rootScope.country change and load info', function() {
		$rootScope.country = 'BY';
		$rootScope.$digest();
		scope.$apply();
		$rootScope.$apply();
//		expect(scope.loading).toBeTruthy();
//		expect(scope.info).toBeDefined();
	});

});
