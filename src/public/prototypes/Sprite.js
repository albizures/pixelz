'use strict';
const Frame = require('./Frame.js');
const {
	ADD,
	DELETE,
	UPDATE,
	CHANGE_FRAME	} = require('../constants.js').frames;
function createSprite() {
	let params = arguments;
	return (function () {
		let width, height,frames = [];
		function Sprite(width,height) {
			this.width = width;
			this.height = height;
			frames.push(Frame(this,0));
			//this.addFrame();
		}
		Sprite.prototype = {
			constructor : Sprite,
			get width(){return width;},
			set width(val){width = val;},
			get height(){return height;},
			set height(val){height = val;},
			get frames(){return frames;}
		};
		Sprite.prototype.getFrame = function (index) {
			return frames[index];
		};
		Sprite.prototype.addFrame = function (indexClone, newIndex) {
			let bitmap, frame, index;

			if(hasVal(indexClone) && hasVal(frames[indexClone])){
				bitmap = frames[index].clone();
			}

			if(hasVal(newIndex)){
				// TODO: Add frame in a specific index
			}else{
				index = frames.length;
				console.log(index);
				frame = Frame(this,index,bitmap);
				frames[index] = frame;
			}
			Editor.events.fire(CHANGE_FRAME,ADD,index,this);
			return frame;
		};
		return new Sprite(...params);
	})();
}
module.exports = createSprite;
