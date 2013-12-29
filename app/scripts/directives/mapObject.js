'use strict';

app.directive('mapObject', [function() {

	function Tooltip() {
		//
	}

	Tooltip.prototype = {

		create: function() {
			this.__element = document.createElement('div');
			this.__element.id = 'map-tooltip';
			document.body.appendChild(this.__element);
			return this;
		},

		setContent: function(content) {
			this.__element.innerHTML = content;
			return this;
		},

		show: function() {
			this.__element.classList.add('show');
		},

		hide: function() {
			this.__element.classList.remove('show');
		},

		setPosition: function(position) {
			this.__element.style.left = position.left + 'px';
			this.__element.style.top  = position.top + 'px';
		}
	};

	return {
		link: function(scope, element) {

			var mapDoc = element[0].contentDocument,
				activePathList = mapDoc.getElementsByClassName('active'),
				tooltip = new Tooltip().create();

			mapDoc.addEventListener('mouseover', function(e) {
				if (e.target.nodeName !== 'path') {
					return;
				}
				setActivePath(e.target);
				tooltip.setContent(e.target.id).show();
			}, false);

			mapDoc.addEventListener('mouseout', function(e) {
				if (e.target.nodeName !== 'path') {
					return;
				}
				clearActivePath();
				tooltip.hide();
			}, false);

			mapDoc.addEventListener('mousemove', function(e) {
				if (e.target.nodeName !== 'path') {
					return;
				}
				tooltip.setPosition({
					left: e.pageX,
					top:  e.pageY
				});
			}, false);

			function clearActivePath() {
				var activePath = activePathList[0];
				if (activePath) {
					activePath.classList.remove('active');
				}
			}

			function setActivePath(path) {
				clearActivePath();
				path.classList.add('active');
			}

		}
	};
}]);