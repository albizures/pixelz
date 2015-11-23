'use strict';
const _ = document;
function createCanvas() {
	let params = arguments;
	return (function () {
		let tool;
		//canvas
		let mnCv, mnCx,prCv, prCx
		//status
		let scale, relW, relH, x, y, clicked,frame;
		let grid = true;

		let parent = _.body;

		let sizePointer;

		function Canvas(f,s,posX,posY,t,sp) {
			scale = s || SCALE_DEF;
			frame = f;
			x = posX || 0;
			y = posY || 0;
			sizePointer = (sp || SIZE_POINTER_DEF) * scale;
			this.tool = t;
			this.init();
		}
		Canvas.prototype = {
			constructor : Canvas,
			get scale(){return scale},
			set scale(val){
				if(val < 1) return;
				sizePointer = (sizePointer/scale) * val;
				scale = val;
				this.cleanPrev();
				this.draw();
			},
			get tool() {return tool},
			set tool(val){
				tool = val;
				tool.canvas = this;
			},
			get width(){return frame.width * scale},
			get height(){return frame.height * scale},
			get x(){ return x - (this.width/2)},
			set x(val){x = val},
			get y(){ return y - (this.height/2)},
			set y(val){y = val},
			get relW(){ return relW},
			set relW(val){
				relW = val;
				if(!hasVal(this.relH) || !hasVal(this.scale)) return;
				width = this.relW * this.scale;
				height = this.relH * this.scale;
			},
			set frame(val){
				frame = val;
				this.draw();
			},
			get relH(){ return relH},
			set relH(val){
				relH = val;
				if(!hasVal(this.relW) || !hasVal(this.scale)) return;
				width = this.relW * this.scale;
				height = this.relH * this.scale;
			}
		};
		Canvas.prototype.on = function (name,handler) {
			$(prCv).on(name,handler);
			return this;
		};
		Canvas.prototype.calcPos = function (x,y) {
			let cord = {};
			let tempX,
					tempY;
			if(x < this.x  || x > this.x+this.width){
				cord.x = x < this.x? 0 : this.width;
				cord.relX = cord.x / scale == 0? 0 : (this.width / this.scale) - 1;
				cord.out = true;
			}else{
				tempX = x - this.x;
				cord.x = this.x + (tempX - (tempX%sizePointer));
				cord.relX = (cord.x - this.x) / scale;
			}
			if(y < this.y || y > this.y+this.height){
				debugger;
				cord.y = y < this.y? 0 : this.height;
				cord.relY = cord.y / scale == 0? 0 : (this.height / this.scale) - 1;
				cord.out = true;
			}else{
				tempY = y - this.y;
				cord.y =	this.y + (tempY - (tempY%sizePointer));
				cord.relY = (cord.y - this.y) / scale;
			}
			return cord;
		};
		Canvas.prototype.init = function () {
			mnCv = _.createElement('canvas');
			mnCx = mnCv.getContext('2d');

			prCv = _.createElement('canvas');
			prCx = prCv.getContext('2d');

			prCv.height = mnCv.height = window.innerHeight;
			prCv.width = mnCv.width = window.innerWidth;

			mnCv.classList.add('canvas');
			prCv.classList.add('preview');

			parent.appendChild(mnCv);
			parent.appendChild(prCv);

			var self = this;
			this.cleanPrev();
			this.cleanMain();
			$(window).on('mousedown.tool',tool.onMouseDown)
				.on('mousemove.tool',tool.onMouseMove)
				.on('mouseup.tool',tool.onMouseUp)
				.on('mouseleave.tool',tool.onMouseLeave)
				.on('click.tool',tool.onClick);
		};
		Canvas.prototype.draw = function () {
			this.cleanMain();
			var a = 1;
			for(let i = 0; i < frame.bitmap.length; i++){
				for(let a = 0; a < frame.bitmap[i].length; a++){
					if(hasVal(frame.bitmap[i][a])){
						mnCx.fillStyle = frame.bitmap[i][a];
						let x = this.x + i * this.scale;
						let y = this.y + a * this.scale;
						mnCx.fillRect(x,y,sizePointer,sizePointer);
					}
					//console.log(a);
				}
			}
		};
		Canvas.prototype.drawAt = function (x,y,color) {

			//console.log(x,y,frame.bitmap[x]);
			//mnCx.fillStyle = '#000';
			//mnCx.fillRect(x,y,sizePointer,sizePointer);
			//console.log(frame.bitmap);
			if(!hasVal(x) || !hasVal(y) || !hasVal(frame.bitmap[x])) return;
			frame.bitmap[x][y] = color || 'black';
			Editor.events.fire('change.frame'+frame.index);
			this.draw();
			//console.log(, ;
		};
		Canvas.prototype.prevAt = function (x,y) {
			prCx.fillStyle = COLOR_POINTER_PREW_DEF;
			prCx.fillRect(x,y,sizePointer,sizePointer);
		};
		Canvas.prototype.cleanMain = function () {
			mnCv.height = mnCv.height;
			mnCv.width = mnCv.width;
		};
		Canvas.prototype.cleanPrev = function (type) {
			prCv.height = prCv.height;
			prCv.width = prCv.width;
			if(grid){
				prCx.strokeStyle = "white";
				prCx.strokeRect(this.x,this.y,this.width,this.height);
				prCx.beginPath();

				for(let r = 0  ; r < frame.width ; r++){
					prCx.moveTo(this.x + r * this.scale, this.y);
		      prCx.lineTo(this.x + r * this.scale, this.y + this.height);
				}
				for(let r = 0;  r < frame.height ; r++){
					prCx.moveTo(this.x , this.y + r * this.scale);
		      prCx.lineTo(this.x +this.width, this.y + r * this.scale);
				}
				prCx.lineWidth = 1;
	      prCx.stroke();
			}
		};
		return new Canvas(params[0],params[1],params[2],params[3],params[4]);
	})();
}


/*
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
	repaint : function(ctx,y,x) {
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
		this.repaint(ctx);
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
}*/
module.exports = createCanvas;
