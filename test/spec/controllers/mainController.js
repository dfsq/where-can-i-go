'use strict';

describe('Controller: mainController', function () {

	// load the controller's module
	beforeEach(module('whereCanIGo'));

	var mainController,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		mainController = $controller('mainController', {
			$scope: scope
		});
	}));

	it('should se title to "Map page"', function () {
		expect(scope.title).toBe("Map page");
	});

});
