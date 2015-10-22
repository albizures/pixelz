(function () {
	'use strict';
	let lastP;
	let pencil = Tool('pencil');
	pencil.onClick = function () {
		//console.log('click');
	};
	pencil.onMouseDown = function () {
		pencil.clicked = true;
	};
	pencil.onMouseMove = function (evt) {
		if(pencil.clicked){

			let cord = pencil.canvas.calcPos(evt.clientX,evt.clientY);
			let newP = Vector(cord.relX,cord.relY);
			newP.out = cord.out;
			if(cord.out && !hasVal(lastP) ) return;
			if(newP.out && lastP && lastP.out){return}
			if(!newP.out && lastP && lastP.out){
				lastP = newP;
			}
			if(hasVal(lastP) && lastP.importantDiff(newP)){
				pencil.getLine(lastP,newP);
			}else{
				pencil.canvas.drawAt(cord.relX,cord.relY);
			}
			lastP = newP;

		}
	};
	pencil.onMouseLeave = function (evt) {
		// if(pencil.clicked){
		// 	pencil.clicked = false;
		// 	let cord = pencil.canvas.calcPos(evt.clientX,evt.clientY - 30);
		// 	console.log(cord);
		// 	let newP = Vector(cord.relX,cord.relY);
		// 	if(hasVal(lastP) && lastP.importantDiff(newP)){
		// 		pencil.getLine(lastP,newP);
		// 	}else{
		// 		pencil.canvas.drawAt(cord.relX,cord.relY);
		// 	}
		// }
		// lastP = undefined;
	}
	pencil.onMouseUp = function (evt) {
		let cord = pencil.canvas.calcPos(evt.clientX,evt.clientY);
		if(!cord.out){
			pencil.canvas.drawAt(cord.relX,cord.relY);
		}
		pencil.clicked = false;
		lastP = undefined;
	};
	Editor.addTool(pencil);
})();
