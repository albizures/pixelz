'use strict';
require('./style/main.styl');

window.hasVal = (val) => {
	return typeof val !== 'undefined' && val !== null;
};
window.$ = require('./$.js');
require('./polyfill.js');
require('./main.js');
