'use strict';
function createTool() {
	let params = arguments
	return(function () {
		let name,canvas,icon,clicked,moved,lastX,lastY;
		function Tool(n) {
			this.name = n;
		}
		Tool.prototype = {
			constructor : Tool,
			get name(){return name},
			set name(val){name = val},
			get canvas(){return canvas},
			set canvas(val){canvas = val;},
			get clicked(){return clicked},
			set clicked(val){clicked = val}
		}
		Tool.prototype.getLine = function (vector1,vector2) {
			let diff = vector1.diff(vector2,true),
					err = diff.x - diff.y;

			while(true){
				this.canvas.drawAt(vector1.x,vector1.y);  // Do what you need to for this

				if ((vector1.x==vector2.x) && (vector1.y == vector2.y)) break;
				let e2 = 2*err;
				if (e2 >-diff.y){ err -= diff.y; vector1.x  += diff.sx; }
				if (e2 < diff.x){ err += diff.x; vector1.y  += diff.sy; }
	   	}
			//console.log(diff);
		};

		return new Tool(params[0]);
	})();
}
module.exports = createTool;
