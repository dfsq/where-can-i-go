'use strict';

describe('Service: countryService', function() {

	var countryService;

	beforeEach(module('whereCanIGo'));

	beforeEach(inject(function(_countryService_) {
		countryService = _countryService_;
	}));

	it('should properly cache requests in in countiesService', function() {
		expect(countryService.getCache('BY')).toBe(null);
		countryService.setCache('BY', {code: 'BY'});
		expect(countryService.getCache('BY')).toEqual({code: 'BY'});
	});

});