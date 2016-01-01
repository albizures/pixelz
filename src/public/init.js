// console.time('canvas');
'use strict';

require('./style/main.styl');

window.hasVal = (val) =>{
	return typeof val !== 'undefined' && val !== null;
};
window.$ = require('./$.js');

require('./main.js');
