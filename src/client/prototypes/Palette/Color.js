'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
		{inheritanceObject, make} = require('../../utils.js'),
		{TRANSPARENT_IMG_URL, RIGHT_CLICK, LEFT_CLICK,} = require('../../constants'),
		Tools = require('../../panels/Tools.js'),
		{SIZE_COLOR_BLOCK, CHANGE_COLOR} = require('../../constants').palette;
function Color(color, active, size) {
	AppendObject.call(this, 'color');
	this.color = color;
	if (active) {
		this.el.classList.add('active');
	}
	this.colorEl = make(['div', {parent : this.el}]);
	this.el.style.backgroundImage = 'url(' + TRANSPARENT_IMG_URL + ')';
	this.colorEl.style.background = color;
	this.active = active;
	this.el.style.height = this.el.style.width =  (size || SIZE_COLOR_BLOCK) + 'px';
	$(this.el).on('mousedown.select', this.select.bind(this));
}
inheritanceObject(Color, AppendObject);
Color.prototype.select = function (evt) {
	console.log('click', evt.which);
	if (evt.which === RIGHT_CLICK) {
		Tools.setSecudaryColor(this.color);
	} else if (evt.which === LEFT_CLICK) {
		Tools.setPrimaryColor(this.color);
	}
};
Color.prototype.changeColor = function (color) {
	this.color = color;
	this.colorEl.style.background = color;
};

module.exports = Color;
