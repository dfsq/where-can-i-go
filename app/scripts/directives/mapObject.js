'use strict';

app.directive('mapObject', ['countryService', '$rootScope', function(countryService, $rootScope) {

	return {
		scope: {
			country: '='
		},

		controller: 'mapObjectController',

		link: function(scope, element) {

			$rootScope.$watch(function() { return $rootScope.country && $rootScope.country.code; }, function(newVal, oldVal) {
				if (newVal !== oldVal) {
					console.log('country changed', newVal, oldVal);
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

			function highlight(list) {
				angular.forEach(list['vf'], function(country) {
					var path = mapDoc.getElementById(country.name.toLowerCase()); // todo: testing...
					if (path) {
						path.classList.add('visa-free');
					}
				});
				angular.forEach(list['va'], function(country) {
					var path = mapDoc.getElementById(country.name);
					if (path) {
						path.classList.add('visa-arrive');
					}
				});
			}

			function setSelectedPath(e) {

				clearPath('selected');
				e.target.classList.add('selected');

				var countryCode = e.target.dataset.code;
				scope.onCountrySelect(countryCode)/*.then(function(data) {
					highlight(data || {});
				});*/
			}
		}
	};
}]);