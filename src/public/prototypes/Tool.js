'use strict';
function createTool() {
	let params = arguments;
	return(function () {
		let name,canvas,icon,clicked,moved,lastX,lastY;
		let tempCounter = 0;
		let stroke = [];
		function Tool(name) {
			this.name = name;
		}
		Tool.prototype = {
			constructor : Tool,
			get stroke(){
				return stroke;
			},
			get name(){return name;},
			set name(val){name = val;},
			get canvas(){return canvas;},
			set canvas(val){canvas = val;},
			get clicked(){return clicked;},
			set clicked(val){clicked = val;}
		};
		Tool.prototype.addPointStroke = function (point) {
			if(stroke.length == 0){
				stroke.push(point);
			}else{
				let lastPoint = stroke[stroke.length - 1];
				if(point.frame.x !== lastPoint.frame.x || point.frame.y !== lastPoint.frame.y ){
					stroke.push(point);
				}
			}

		};
		Tool.prototype.cleanStroke = function () {
			let tempStroke = stroke;
			stroke = [];
			tempCounter = 0;
			return tempStroke;
		};
		Tool.prototype.clonePoint = function (point) {
			return {
        frame : point.frame.clone(),
        paint : point.paint.clone(),
        out : point.out,
				color : point.color
      };
		};
		Tool.prototype.getLineBetween = function (point1,point2) {
			point1 = this.clonePoint(point1);
			point2 = this.clonePoint(point2);
			let diff = point1.frame.diffAbs(point2.frame,true),
					err = diff.x - diff.y;

			while(true){
				var tempPoint = this.clonePoint(point1);
				tempPoint.paint = this.canvas.cordFrameToPaint(tempPoint.frame);
				this.canvas.previewAt(tempPoint.paint,tempPoint.color);
				this.addPointStroke(tempPoint);  // Do what you need to for this
				if ((point1.frame.x == point2.frame.x) && (point1.frame.y == point2.frame.y)) break;
				let e2 = 2 * err;
				if (e2 >-diff.y){ err -= diff.y; point1.frame.x  += diff.sx; }
				if (e2 < diff.x){ err += diff.x; point1.frame.y  += diff.sy; }
			 	}
		};

		return new Tool(...params);
	})();
}
module.exports = createTool;
