app.directive('mapObject', [function() {
	return {
		link: function(scope, element) {

			var mapDoc = element[0].contentDocument,
				activePathList = mapDoc.getElementsByClassName('active');

			mapDoc.addEventListener('mouseover', function(e) {
				if (e.target.nodeName !== 'path') {
					return;
				}
				setActivePath(e.target);
			});

			function setActivePath(path) {
				var activePath = activePathList[0];
				if (activePath) {
					activePath.classList.remove('active');
				}
				path.classList.add('active');
			}
		}
	};
}]);