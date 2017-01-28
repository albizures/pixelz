import '../assets/images/profile.png';

import make from '../utils/make';

const context = document.createElement('canvas').getContext('2d'); 

context.canvas.height = context.canvas.width = 64;

context.fillStyle = '#989898',
context.fillRect(0, 0,  32, 32);
context.fillRect(32, 32,  32, 32);


context.fillStyle = '#CCCCCC';
context.fillRect(0, 32,  32, 32);
context.fillRect(32, 0,  32, 32);

export const transparent = context.canvas;
export const transparentB64 = context.canvas.toDataURL();
export const transparentImage = 'url(\'' + exports.transparentB64 + '\')';

make([
  'style',
  {parent: document.head},
  '.transparent-bkg{background-image:' + exports.transparentImage + '}'
]);

export const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';
export const LEFT_CLICK = 1;
export const MIDDLE_CLICK = 2;
export const RIGHT_CLICK = 3;