app.factory('countryService', ['$http', function($http) {
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