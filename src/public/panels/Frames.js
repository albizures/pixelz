'use strict';

const Panel = require("../prototypes/Panel.js");

const Frames = Panel('Frames');
const ul =  document.createElement('ul'),
      btnAdd = document.createElement('button');
let item = [];
Frames.mainInit = function () {
  btnAdd.textContent = 'add frame';
  $(btnAdd).on('click.add',Editor.addFrame.bind(Editor));
  ul.id = 'preview-frames';
  
  this.div.appendChild(btnAdd);
  this.div.appendChild(ul);

}
Frames.addPreview = function () {

}
Frames.updateAll = function () {

}

module.exports = () => Editor.addPanel(Frames);
