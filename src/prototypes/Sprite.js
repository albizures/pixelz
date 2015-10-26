import Frame from './Frame.js';

function createSprite() {
	let params = arguments;
	return (function () {
		let width, height,frames = [];
		function Sprite(w,h) {
			width = w || WIDTH_DEF;
			height = h || HEIGHT_DEF;
			frames.push(Frame(this,0));
			//this.addFrame();
		}
		Sprite.prototype = {
			constructor : Sprite,
			get width(){return width},
			set width(val){width = val},
			get height(){return height},
			set height(val){height = val},
			get frames(){return frames}
		};
		Sprite.prototype.addFrame = function (clone,i) {
			let index = i || frames.length - 1;

			let bitmap;
			if(clone && hasVal(frames[index])){
				bitmap = frames[index].clone();
			}
			let frame = Frame(this,index + 1,bitmap);
			frames.push(frame);
			return frame;
		};
		return new Sprite(params[0],params[1]);
	})();
}
export default  createSprite;
