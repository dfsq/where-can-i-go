'use strict';

app.factory('countryService', ['$http', function($http) {
	return {
		/**
		 * Get countries for passed one.
		 * @param {Object} query
		 * @return {angular.promise}
		 */
		from: function(query) {

			return $http.get('/api/from/' + query.code)

			.then(function(response) {
				var data;
				if (response.data && typeof response.data === 'object') {
					data = response.data;
				}
				else {
					data = query;
					data.error = 'Country "' + query.code + '" was not found.';
				}
				return data;
			});
		}

	};
}]);