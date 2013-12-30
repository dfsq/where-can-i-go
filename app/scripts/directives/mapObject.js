'use strict';

app.directive('mapObject', ['countryService', function(countryService) {

	function Tooltip() {
		//
	}

	Tooltip.prototype = {

		create: function() {
			this._element = document.createElement('div');
			this._element.id = 'map-tooltip';
			document.body.appendChild(this._element);
			return this;
		},

		setContent: function(content) {
			this._element.innerHTML = content;
			return this;
		},

		show: function() {
			this._element.classList.add('show');
		},

		hide: function() {
			this._element.classList.remove('show');
		},

		setPosition: function(position) {
			this._element.style.left = position.left + 'px';
			this._element.style.top  = position.top + 'px';
		}
	};

	return {
		link: function(scope, element) {

			var mapDoc = element[0].contentDocument,
				pathList = {
					all: mapDoc.getElementsByTagName('path'),
					selected: mapDoc.getElementsByClassName('selected'),
					active:   mapDoc.getElementsByClassName('active')
				},
				tooltip = new Tooltip().create();

			mapDoc.addEventListener('mouseover', function(e) {
				if (filterTarget(e)) {
					setActivePath(e.target);
					tooltip.setContent(e.target.id).show();
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
			});

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
				angular.forEach(list['fr'], function(name) {
					var path = mapDoc.getElementById(name);
					if (path) {
						path.classList.add('visa-free');
					}
				});
				angular.forEach(list['ar'], function(name) {
					var path = mapDoc.getElementById(name);
					if (path) {
						path.classList.add('visa-arrive');
					}
				});
			}

			function setSelectedPath(e) {
				clearPath('selected');
				e.target.classList.add('selected');

				// TODO: clicked country name save in data-name
				var country = e.target.id;

				countryService.getList(country).success(function(data) {
					highlight(data[country] || []);
				});
			}
		}
	};
}]);