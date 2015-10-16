(function ($) {
	'use strict';

	function Frame() {
		var index,
				canvas,
				cx;

		this.cv = $.createElement('canvas');
		this.cx = this.cv.getContext('2d');

		Frame.prototype = {
			constructor : Frame,
			get index(){
				return index;
			},
			set index(val){
				index = val;
			},
			get cv(){ return cv},
			set cv(val){canvas = val},
			get cx(){return cx},
			set cx(val){cx = val;}
		}
	}
	function createFrame() {
		let params = arguments;
		return (function () {
			var index,bitmap,cx , sprite;
			function Frame(s,i) {
				sprite = s;
				index = i;
				bitmap = new Array(sprite.width);
				for(let i = 0 ; i < bitmap.length ; i++){
					bitmap[i] = new Array(sprite.height);
				}
			}
			Frame.prototype = {
				constructor : Frame,
				get index(){
					return index;
				},
				set index(val){
					index = val;
				},
				generatePreview(scale){
					let newCanvas = $.createElement('canvas');
					newCanvas.width = sprite.width * scale;
					newCanvas.height = sprite.height * scale;
					let newCtx = newCanvas.getContext('2d');
					for(let i in bitmap){
						for(let a in bitmap[i]){
							if(hasVal(bitmap[i][a])){
								newCtx.fillStyle = bitmap[i][a];
								let x = i * scale;
								let y = a * scale;
								newCtx.fillRect(x,y,scale,scale);
							}
						}
					}
					return newCanvas;
				},
				get bitmap(){return bitmap},
				get cv(){ return cv},
				set cv(val){canvas = val},
				get cx(){return cx},
				set cx(val){cx = val;},
				get width(){return sprite.width},
				get height(){return sprite.height}
			}
			return new Frame(params[0],params[1]);
		})();
	}

	window.Frame = createFrame;
})(document);
