
(function ($) {
	'use strict';
	window.hexa = (numbre) =>{
		return numbre.toString(16);
	}
	window.deci = (numbre) => {
		return parseInt(number,16);
	}
	window.hasVal = (val) =>{
		return typeof val !== 'undefined' && val !== null;
	}


	window.onload = () => {
		//cv = document.getElementById("canvas");
		//ctx = cv.getContext('2d');
		//cv.height = window.innerHeight;
		//cv.width = window.innerWidth;
		//canvas = new Canvas(null,null,(cv.width/2) - ((WIDTH_DEF/2)*SCALE_DEF) ,(cv.height/2) - ((HEIGHT_DEF/2)* SCALE_DEF));
		//console.log(canvas);
		//canvas.repaint(ctx);
		// cv.addEventListener('mousemove',(evt) => {
		// 	canvas.pointerPreview(ctx,evt.clientX ,evt.clientY);
		// });
		// cv.addEventListener('click', (evt) =>{
		//
		// });
		//let sprite = Sprite(WIDTH_DEF,HEIGHT_DEF);
		Editor.init();

	}
	window.onresize = () => {

		cv.height = window.innerHeight;
		cv.width = window.innerWidth;

		canvas.y = (cv.height/2) - (canvas.height/2);
		canvas.x = (cv.width/2) - (canvas.width/2);
		//console.log('resize',canvas);
		canvas.paint(ctx);
	}
})(document);
