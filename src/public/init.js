console.time('canvas');
'use strict';

require("./style/main.styl");

window.HEIGHT_DEF = 40,
window.WIDTH_DEF = 40,
window.SCALE_DEF = 15,
window.SIZE_POINTER_DEF = 1,
window.COLOR_POINTER_PREW_DEF = 'rgba(255,255,255,0.2)';


window.hasVal = (val) =>{
	return typeof val !== 'undefined' && val !== null;
};
window.$ = require('./$.js');

require('./main.js');
