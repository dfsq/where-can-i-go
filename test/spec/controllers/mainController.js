'use strict';

describe('Controller: mainController', function () {

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	var mainController,
		$rootScope,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_) {
		$rootScope = _$rootScope_;
		scope = _$rootScope_.$new();
		mainController = $controller('mainController', {
			$scope: scope
		});
	}));

	it('should set country to "null"', function () {
		expect($rootScope.country).toBe(null);
	});

});
