

(function () {
	'use strict';
	window.hexa = (numbre) =>{
		return numbre.toString(16);
	}
	window.deci = (numbre) => {
		return parseInt(number,16);
	}

	const HEIGHT_DEF = 50,
				WIDTH_DEF = 50,
				SCALE_DEF = 8,
				SIZE_POINTER_REL_DEF = 5,
				SIZE_POINTER_DEF = SIZE_POINTER_REL_DEF * SCALE_DEF,
				COLOR_POINTER_PREW_DEF = 'rgba(255,255,255,0.5)';

	var sizePointerRel = SIZE_POINTER_REL_DEF,
			sizePointer	= SIZE_POINTER_DEF;

	var cv,
			ctx,
			canvas;


	function Canvas(w,h,x,y) {
		this.scale = SCALE_DEF;
		this.relW = w || WIDTH_DEF;
		this.relH = h || HEIGHT_DEF;
		this.width = this.relW * this.scale;
		this.height = this.relH * this.scale;
		this.bitmap = [];
		this.x = x || 0;
		this.y = y || 0;
	}
	Canvas.prototype = {
		contruct : Canvas,
		get relW (){
			return this._w;
		},
		set relW (value){
			this._w = value;
			this.width = value * this.scale;
		},
		get relH (){
			return this._h;
		},
		set relH (value){
			this._h = value;
			this.height = value * this.scale;
		},
		paint : function(ctx,y,x) {
			ctx.strokeRect(this.x,this.y,this.width,this.height);
			for (var i = 0; i < (this.relW/(sizePointerRel)); i++) {
					ctx.beginPath();
					ctx.moveTo((i*sizePointer) + this.x,this.y);
					ctx.lineTo((i*sizePointer) + this.x, this.height + this.y);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(this.x,(i*sizePointer) + this.y);
					ctx.lineTo(this.x+this.width, (i*sizePointer) + this.y);
					ctx.stroke();
				}
		},
		pointerPreview : function(ctx,x,y){
				//console.log(ctx,x,y,COLOR_POINTER_PREW_DEF);
			//ctx.save();
			//console.log(x,y);
			clean();
			this.paint(ctx);
			if(x < this.x  || x > this.x+this.width  || y < this.y || y > this.y+this.height  ) return;
			var tempX = x - this.x,
					tempY = y - this.y;
			x = this.x + (tempX - (tempX%sizePointer));
			y =	this.y + (tempY - (tempY%sizePointer));
			//console.log(tempX,tempY);
			ctx.fillStyle = COLOR_POINTER_PREW_DEF;
			ctx.fillRect(x,y,sizePointer,sizePointer);

			// if(tempX < sizePointer && tempY < sizePointer){
			// 	x = this.x + (sizePointer / 2);
			// 	y = this.y + (sizePointer / 2);
			// 	ctx.fillStyle = COLOR_POINTER_PREW_DEF;
			// 	ctx.fillRect(x-(sizePointer/2),y-(sizePointer/2),sizePointer,sizePointer);
			// }

		}
	}

	window.onload = () => {
		cv = document.getElementById("canvas");
		ctx = cv.getContext('2d');
		cv.height = window.innerHeight;
		cv.width = window.innerWidth;
		canvas = new Canvas(null,null,(cv.width/2) - ((WIDTH_DEF/2)*SCALE_DEF) ,(cv.height/2) - ((HEIGHT_DEF/2)* SCALE_DEF));
		console.log(canvas);
		canvas.paint(ctx);
		document.addEventListener('mousemove',(evt) => {
			canvas.pointerPreview(ctx,evt.clientX ,evt.clientY);
		});
	}
	function clean() {
		cv.height = cv.height;
		cv.width = cv.width;
	}
	window.onresize = () => {

		cv.height = window.innerHeight;
		cv.width = window.innerWidth;

		canvas.y = (cv.height/2) - (canvas.height/2);
		canvas.x = (cv.width/2) - (canvas.width/2);
		//console.log('resize',canvas);
		canvas.paint(ctx);
	}
	window.editor = {

	}
})();
