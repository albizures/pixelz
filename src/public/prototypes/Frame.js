'use strict';
const { imageSmoothing } = require('../utils.js');
const {
	ADD,
	DELETE,
	UPDATE,
	CHANGE_FRAME} = require('../constants').frames;
function createFrame() {
  let params = arguments;
  return (function () {
    let index,bitmap,context , sprite,li,status;
    function Frame(sprite,index,bitmap) {
      this.sprite = sprite;
      this.index = index;
      this.bitmap = bitmap || new Array(sprite.width);

      if(!hasVal(bitmap)){
        for(let i = 0 ; i < this.bitmap.length ; i++){
          this.bitmap[i] = new Array(sprite.height);
        }
      }
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
      get sprite(){
        return sprite;
      },
      set sprite(val){
        sprite = val;
      },
      get context(){
        return context;
      },
      get canvas(){
        return context.canvas;
      },
      get bitmap(){return bitmap;},
      set bitmap(val){
        bitmap = val;
      },
      get imageData(){
        return context.getImageData(0,0,sprite.width,sprite.height);
      },
      get width(){return sprite.width;},
      get height(){return sprite.height;}
    };
    Frame.prototype.init = function () {
      context = document.createElement('canvas').getContext('2d');
      imageSmoothing(context,false);
      context.canvas.width = sprite.width;
      context.canvas.height = sprite.height;
    };
    Frame.prototype.getIMG = function () {
      let image = document.createElement('img');
      image.src = context.canvas.toDataURL();
      return image;
    };
    Frame.prototype.clone = function () {
      var newBitmap = [];
      for (let i of bitmap) {
        newBitmap.push(i.slice(0));
      }
      return newBitmap;
    };
    Frame.prototype.validCord = function (cord) {
      return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
    };
    Frame.prototype.paintAt = function (cord,color,realCord) {
      if( !this.validCord(cord) ) return;
      bitmap[cord.x][cord.y] = color;
      context.fillStyle = color;
			context.clearRect(cord.x,cord.y,1,1);
      context.fillRect(cord.x,cord.y,1,1);
      Editor.events.fire('paint',realCord,color);
    };
    Frame.prototype.paintStroke = function (listCords) {
      for (let i = 0; i < listCords.length; i++) {
        this.paintAt(listCords[i].frame,listCords[i].color,listCords[i].paint);
      }
			Editor.events.fire(CHANGE_FRAME,UPDATE,index,sprite);
    };
    Frame.prototype.generatePreview = function (scale) {
      return context;
    };
    return new Frame(...params);
  })();
}

module.exports = createFrame;
