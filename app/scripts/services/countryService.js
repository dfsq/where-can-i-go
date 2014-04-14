'use strict';

app.factory('countryService', ['$http', '$q', function($http, $q) {

	// Store previously loaded data in cache
	var requestCache = {};

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
				console.log('from cache', cacheData);
				return deferred.promise;
			}

			return $http.get('/api/from/' + query.code)

			.then(function(response) {
				var data;
				if (response.data && typeof response.data === 'object') {
					data = response.data;
					self.setCache(query.code, response.data);
				}
				else {
					data = query;
					data.error = 'Country "' + query.code + '" was not found.';
				}
				return data;
			},
			function(data) {
				data = query;
				data.error = data.error || 'There was a problem getting a data.';
				return data;
			});
		}

	};
}]);