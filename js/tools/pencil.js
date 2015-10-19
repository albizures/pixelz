(function () {
	'use strict';
	let lastP;
	let pencil = Tool('pencil');
	pencil.onClick = function () {};
	pencil.onMouseDown = function () {
		pencil.clicked = true;
	};
	pencil.onMouseMove = function (evt) {
		if(pencil.clicked){

			let cord = pencil.canvas.calcPos(evt.clientX,evt.clientY);
			let newP = Vector(cord.relX,cord.relY);
			newP.out = cord.out;
			// if( hasVal(lastP) && (lastP.x == 0 || lastP.x == 19 || lastP.y == 0 || lastP.y == 19)){
			// 	if(cord.out){
			// 		return;
			// 	}else{
			// 		lastP = newP;
			// 	}
			// }
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
		pencil.clicked = false;
		lastP = undefined;
	};
	Editor.addTool(pencil);
})();
