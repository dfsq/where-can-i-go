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
			return data;
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
					currentCountry = self.setCache(query.code, response.data);
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
		 */
		getCurrentCountry: function() {
			return currentCountry;
		},

		/**
		 * Expose for testing purposes.
		 */
		setCurrentCountry: function(country) {
			currentCountry = country;
		},

		/**
		 * Find a country by key in vf, va, vr arrays.
		 * @param code {String}
		 */
		findByCode: function(code) {

			var data = this.getCurrentCountry(),
				key, i, obj;

			for (key in data) {
				for (i = 0; i < data[key].length; i++) {
					if (data[key][i].code === code) {
						obj = data[key][i];
						obj.visaGroup = key;
						return obj;
					}
				}
			}

			return null;
		}

	};
}]);