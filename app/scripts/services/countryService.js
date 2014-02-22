'use strict';

app.factory('countryService', ['$http', function($http) {

	var collectionUrl = 'https://api.mongolab.com/api/1/databases/wherecanigo/collections/countries',
		apiKey = 'IXGMQbrk_gGDz-BsX-CCcYAsfEEcsuI3';

	return {
		/**
		 * Get visa free countries for passed one.
		 * @param {Object} query
		 * @return {angular.promise}
		 */
		get: function(query) {
			return $http.get(collectionUrl, {
				params: {
					apiKey: apiKey,
					fo: true,
					q: query
				}
			})
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
		},

		query: function(query) {
			return $http.get(collectionUrl, {
				params: {
					apiKey: apiKey,
					q: query || {}
				}
			});
		}
	};
}]);