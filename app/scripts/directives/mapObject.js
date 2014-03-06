'use strict';

app.directive('mapObject', ['countryService', '$rootScope', '$timeout', function(countryService, $rootScope, $timeout) {

	/**
	 * Initialize directive (delayed linking function).
	 */
	function initDirective(scope, element) {

		// Listen country change
		$rootScope.$watch(function() {
			return $rootScope.country && $rootScope.country.code + '|' + $rootScope.tab;
		},
		function(newVal, oldVal) {
			if (newVal !== oldVal) {

				console.log('country|tab changed', newVal, oldVal);

				// Clear previous hightlights
				if (oldVal) {
					var oldParts = oldVal.split('|');
					clearPath(oldParts[1]);
				}

				// Highlight new
				highlight($rootScope.country, $rootScope.tab);
			}
		});

		/**
		 * Live NodeList collections.
		 */
		var mapDoc = element[0].contentDocument,
			pathList = {
				all: mapDoc.getElementsByTagName('path'),
				selected: mapDoc.getElementsByClassName('selected'),
				active:   mapDoc.getElementsByClassName('active'),
				vf: mapDoc.getElementsByClassName('vf'),
				va: mapDoc.getElementsByClassName('va'),
				vr: mapDoc.getElementsByClassName('vr')
			},
			tooltip = new MapTooltip('country').create();


		mapDoc.addEventListener('mouseover', function(e) {
			if (filterTarget(e)) {
				setActivePath(e.target);
				tooltip.setContent(e.target.dataset.name).show();
			}
		}, false);

		mapDoc.addEventListener('mouseout', function(e) {
			if (filterTarget(e)) {
				clearPath('active');
				tooltip.hide();
			}
		}, false);

		mapDoc.addEventListener('mousemove', function(e) {
			if (filterTarget(e)) {
				tooltip.setPosition({
					left: e.pageX,
					top:  e.pageY
				});
			}
		}, false);

		mapDoc.addEventListener('click', function(e) {
			if (filterTarget(e)) {
				setSelectedPath(e);
			}
		}, false);


		function filterTarget(e) {
			return e.target.nodeName === 'path';
		}

		function clearPath(className) {
			var path = pathList[className];
			while (path.length) {
				path[0].classList.remove(className);
			}
		}

		function setActivePath(path) {
			clearPath('active');
			path.classList.add('active');
		}

		function highlight(country, tab) {

			setClass(country.code, 'selected');

			if (country[tab]) {
				for (var i = 0; i < country[tab].length; i++) {
					setClass(country[tab][i].code, tab);
				}
			}
		}

		/**
		 * Get country path elements by country code.
		 * @param {String} code
		 * @returns {NodeList}
		 */
		function getPath(code) {
			return mapDoc.querySelectorAll('[data-code="' + code + '"]');
		}

		/**
		 * Set className to elements with country code.
		 * @param {String} code
		 * @param {String} className
		 */
		function setClass(code, className) {
			var list = getPath(code);
			if (list && list.length) {
				for (var i = 0; i < list.length; i++) {
					list[i].classList.add(className);
				}
			}
		}

		function setSelectedPath(e) {

			clearPath('selected');
			e.target.classList.add('selected');

			var countryCode = e.target.dataset.code;
			scope.onCountrySelect(countryCode);
		}
	}


	return {
		scope: {
			country: '='
		},
		controller: 'mapObjectController',

		link: function(scope, element) {
			// Delay directive linking untill DOM is ready (SVG takes its sweet time)
			$timeout(function() {
				initDirective(scope, element);
			}, 50);
		}
	};
}]);