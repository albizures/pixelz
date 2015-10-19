(function () {
	'use strict';

	function createVector() {
		let params = arguments;
		return (function () {
			let x,y;
			function Vector(x,y) {
				this.x = x;
				this.y = y;
			}
			Vector.prototype = {
				set x(val){x = val;},
				get x(){return x},
				set y(val){y = val;},
				get y(){return y}
			}
			Vector.prototype.diff = function (vector,abs) {
				let x = this.x - vector.x,
						y = this.y - vector.y;
				return {
					x : abs? Math.abs(x) : x,
					y : abs? Math.abs(y) : y,
					sx : (this.x < vector.x) ? 1 : -1,
					sy : (this.y < vector.y) ? 1 : -1
				}
			};
			Vector.prototype.importantDiff = function (vector) {
				let diff = this.diff(vector,true);
				return diff.x > 1 || diff.y > 1;
			};
			return new Vector(params[0],params[1]);
		})();
	}
	window.Vector = createVector;
})();
