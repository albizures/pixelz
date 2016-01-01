'use strict';

const Panel = require('../prototypes/Panel.js');
const Frames = Panel('Frames');
const { CHANGE_SPRITE	} = require('../constants.js').sprite;
const {
	ADD,
	DELETE,
	UPDATE,
  CHANGE_FRAME	} = require('../constants.js').frames;

const ul =  document.createElement('ul'),
      btnAdd = document.createElement('button');
let index = 1,frames = {};
Frames.mainInit = function () {
  btnAdd.textContent = 'add frame';
  ul.id = 'preview-frames';

  this.div.appendChild(btnAdd);
  this.div.appendChild(ul);
	Editor.events.on(CHANGE_SPRITE + '.' + this.name ,this.changeSprite,this);
  Editor.events.on(CHANGE_FRAME + '.' + this.name,this.changeFrame,this);
};
Frames.changeSprite = function (sprite) {
	$(btnAdd).on('click.add',sprite.addFrame.bind(sprite));
};
Frames.changeFrame = function (type,index,sprite) {
  switch (type) {
    case ADD:
      this.addFrame(index,sprite);
      break;
    case DELETE:

      break;
    case UPDATE:
			this.updateFrame(index,sprite);
      break;
    default:

  }
};
Frames.updateFrame = function (index,sprite) {
	frames[index].context.drawImage(sprite.frames[index].getIMG(),0,0,sprite.width,sprite.height);
};
Frames.addPreview = function () {
  sprite.addFrame(true);
};
Frames.getIndex = function () {
  return index;
};
Frames.addFrame = function (index,sprite) {
  let li = document.createElement('li');
  let context = document.createElement('canvas').getContext('2d');
  li.appendChild(context.canvas);
	context.canvas.width = sprite.width;
	context.canvas.height = sprite.height;
  ul.appendChild(li);
	frames[index] = {
		li,
		context
	};
};
Frames.updateAll = function () {

};

module.exports = () => Editor.addPanel(Frames);
