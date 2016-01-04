(function (_) {
	'use strict';
	const SCALE_DEF = 4;
	let ul = $('#list-preview-frames');

	function createFrame() {
		let params = arguments;
		return (function () {
			var index,bitmap,cx ,cv, sprite,li,scale,status;
			function Frame(s,i,b,sc) {
				sprite = s;
				index = i;
				bitmap = b || new Array(sprite.width);
				scale = sc || SCALE_DEF;

				if(!hasVal(b)){
					for(let i = 0 ; i < bitmap.length ; i++){
						bitmap[i] = new Array(sprite.height);
					}
				}

				Editor.events.on('change.frame' + index,this.onChange,this);
				this.init();
			}
			Frame.prototype = {
				constructor : Frame,
				get index(){
					return index;
				},
				set index(val){
					index = val;
				},
				get bitmap(){return bitmap},
				get cv(){ return cv},
				set cv(val){canvas = val},
				get cx(){return cx},
				set cx(val){cx = val;},
				get width(){return sprite.width},
				get height(){return sprite.height}
			}
			Frame.prototype.init = function () {
				cv = _.createElement('canvas');
				li = _.createElement('li');

				cv.width = sprite.width * scale;
				cv.height = sprite.height * scale;
				cv.classList.add('frame-preview');
				cv.id = "f"+index;
				cx = cv.getContext('2d');
				var self = this;
				$(li).on('click.selectFrame',function () {
					Editor.events.fire('selectFrame',self);
				});
				this.append();
			};
			Frame.prototype.getIMG = function () {
				let image = document.createElement("img")
				image.src = cv.toDataURL();
				return image;
			};
			Frame.prototype.clone = function () {
				var newBitmap = [];
				for (let i of bitmap) {
					newBitmap.push(i.slice(0));
				}
				return newBitmap;
			};
			Frame.prototype.append = function () {
				if($('#f'+index).length === 0){
					$(li).append(cv);
					$(ul).append(li);
				}
				this.onChange();
			};
			Frame.prototype.remove = function () {
				li.remove();
			};
			Frame.prototype.onSelect = function () {

			};
			Frame.prototype.onChange = function () {
				for(let i = 0; i < bitmap.length; i++){
					for(let a = 0; a < bitmap[i].length; a++){
						if(hasVal(bitmap[i][a])){
							cx.fillStyle = bitmap[i][a];
							let x = i * scale;
							let y = a * scale;
							cx.fillRect(x,y,scale,scale);
						}
					}
				}
			};
			Frame.prototype.generatePreview = function (scale) {
				return cx;
			}
			return new Frame(params[0],params[1],params[2]);
		})();
	}

	window.Frame = createFrame;
})(document);