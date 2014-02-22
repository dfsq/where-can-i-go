'use strict';

app.directive('mapObject', ['countryService', '$rootScope', function(countryService, $rootScope) {

	return {
		scope: {
			country: '='
		},

		controller: 'mapObjectController',

		link: function(scope, element) {

			// Listen country change
			$rootScope.$watch(function() {
				return $rootScope.country && $rootScope.country.code + '|' + $rootScope.tab;
			}, function(newVal, oldVal) {
				if (newVal !== oldVal) {
					console.log('country|tab changed', newVal, oldVal);
					highlight($rootScope.country, $rootScope.tab);
				}
			});

			var mapDoc = element[0].contentDocument,
				pathList = {
					all: mapDoc.getElementsByTagName('path'),
					selected: mapDoc.getElementsByClassName('selected'),
					active:   mapDoc.getElementsByClassName('active')
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

			mapDoc.addEventListener('click', function(e) {
				if (filterTarget(e)) {
					setSelectedPath(e);
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

			function filterTarget(e) {
				return e.target.nodeName === 'path';
			}

			function clearPath(className) {
				var path = pathList[className][0];
				if (path) {
					path.classList.remove(className);
				}
			}

			function setActivePath(path) {
				clearPath('active');
				path.classList.add('active');
			}

			function highlight(list, tab) {
				for (var i = 0; i < list[tab].length; i++) {
					var path = mapDoc.querySelectorAll('[data-code="' + list[tab][i].code + '"]');
					if (path && path.length) {
						for (var ii = 0; ii < path.length; ii++) {
							path[ii].classList.add(tab);
						}
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
	};
}]);