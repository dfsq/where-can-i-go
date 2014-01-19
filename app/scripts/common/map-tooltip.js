/**
 * MapTooltip to be used with SVG map to display diferent information.
 * @constructor
 */
function MapTooltip(type) {
	this.type = type;
}

MapTooltip.prototype = {
	/**
	 * @returns {MapTooltip}
	 */
	create: function() {
		this._element = document.createElement('div');
		this._element.className = this.type + '-tooltip tooltip';
		document.body.appendChild(this._element);
		return this;
	},

	/**
	 * @param {String} content HTML content.
	 * @returns {MapTooltip}
	 */
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
	},

	toggleLoading: function() {
		this._element.classList.toggle('loading');
	}
};