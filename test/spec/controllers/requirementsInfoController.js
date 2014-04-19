'use strict';

describe('Controller: requirementsInfoController', function() {

	var requirementsController,
		$rootScope,
		$routeParams,
		countryService,
		fromCountry,
		$scope;

	beforeEach(module('whereCanIGo'));

	beforeEach(inject(function($controller, _$rootScope_, $injector) {

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		countryService = $injector.get('countryService');
		$routeParams = {
			fromCountryCode: 'BY',
			toCountryCode: 'US'
		};

		fromCountry = {
			code: 'BY',
			name: 'Belarus',
			vr: [
				{code: 'US', name: 'United States'}
			]
		};

		countryService.setCurrentCountry(fromCountry);

		requirementsController = $controller('requirementsInfoController', {
			$scope: $scope,
			$routeParams: $routeParams,
			fromCountry: fromCountry
		});

		$rootScope.$apply();

	}));


	it('should set fromCountry and toCountry objects', function() {
		expect($scope.toCountry.code).toEqual('US');
		expect($rootScope.country).toEqual(fromCountry);
		expect($rootScope.tab).toBe('vr');
	});

});