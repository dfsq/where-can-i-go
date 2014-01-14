'use strict';

app.factory('countryService', ['$http', function($http) {

	var collectionUrl = 'https://api.mongolab.com/api/1/databases/wherecanigo/collections/countries',
		apiKey = 'IXGMQbrk_gGDz-BsX-CCcYAsfEEcsuI3';

	return {
		/**
		 * Get visa free countries for passed one.
		 * @param country
		 * @returns {angular.promise}
		 */
		get: function(query) {
			return $http.get(collectionUrl, {
				params: {
					apiKey: apiKey,
					fo: true,
					q: query
				}
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