'use strict';

const Panel = require("../prototypes/Panel.js");

const Frames = Panel('Frames');
const ul =  document.createElement('ul'),
      btnAdd = document.createElement('button');
let frames = [];
Frames.mainInit = function () {
  btnAdd.textContent = 'add frame';
  $(btnAdd).on('click.add',Editor.addFrame.bind(Editor));
  ul.id = 'preview-frames';

  this.div.appendChild(btnAdd);
  this.div.appendChild(ul);
  Editor.events.on('addFrame.frame',this.onAddFrame,this);
}
Frames.addPreview = function () {

}
Frames.onAddFrame = function (frame) {
  console.info(frame);
  frames[frame.index];
  frame.appendTo(ul);
}
Frames.updateAll = function () {

}

module.exports = () => Editor.addPanel(Frames);
