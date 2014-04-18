'use strict';

app.factory('countryService', ['$http', '$q', function($http, $q) {

	// Store previously loaded data in cache
	var requestCache = {},
		currentCountry = null;

	return {
		/**
		 * Check/get data from the cache.
		 * @returns {*|null}
		 */
		getCache: function(key) {
			return requestCache[key] || null;
		},

		/**
		 * Set the cache of the request.
		 */
		setCache: function(key, data) {
			requestCache[key] = data;
		},

		/**
		 * Get countries for passed one.
		 * @param {Object} query
		 * @return {promise}
		 */
		from: function(query) {

			var self  = this,
				cacheData = this.getCache(query.code);

			if (cacheData) {
				var deferred = $q.defer();
				deferred.resolve(cacheData);
				currentCountry = cacheData;
				return deferred.promise;
			}

			return $http.get('/api/from/' + query.code)

			.then(function(response) {
				var data;
				if (response.data && typeof response.data === 'object') {
					data = response.data;
					self.setCache(query.code, response.data);
					currentCountry = cacheData;
				}
				else {
					data = query;
					data.error = 'Country "' + query.code + '" was not found.';
					currentCountry = null;
				}
				return data;
			},
			function(data) {
				data = query;
				data.error = data.error || 'There was a problem getting a data.';
				currentCountry = null;
				return data;
			});
		},

		/**
		 * Get the information about currently selected country.
		 * @param countryCode {String}
		 */
		getCurrentCountry: function() {
			return currentCountry;
		}

	};
}]);