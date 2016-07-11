
const context = document.createElement('canvas').getContext('2d'); 

context.canvas.height = context.canvas.width = 64;

context.fillStyle = 'white',
context.fillRect(0, 0,  32, 32);
context.fillRect(32, 32,  32, 32);


context.fillStyle = '#CCCCCC';
context.fillRect(0, 32,  32, 32);
context.fillRect(32, 0,  32, 32);

exports.transparent = context.canvas;
exports.transparentB64 = context.canvas.toDataURL();
exports.transparentImage = 'url(\'' + exports.transparentB64 + '\')';

exports.LEFT_CLICK = 1;
exports.MIDDLE_CLICK = 2;
exports.RIGHT_CLICK = 3;