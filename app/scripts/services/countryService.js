app.factory('countryService', ['$http', function($http) {

	/*
	xpath wikipedia
	var xpath = '/*//*[@id="mw-content-text"]/table[1]/tbody/tr/td[text()="Visa on arrival"]/preceding-sibling::td[1]/a';
	var visaFree = $x(xpath);

	var map = [].slice.call(visaFree).map(function(el) {
		return el.innerText;
	})
	*/

	return {
		/**
		 * Get visa free countries for passed one.
		 * @param country
		 * @returns {angular.promise}
		 */
		getList: function(country) {
			return $http({
				url: 'json/countries.json',
				method: 'GET',
				responseType: 'json'
			});
		}
	};
}]);