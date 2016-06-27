'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const make = require('make');

const List = require('./Frames/Components/List.js');
const Panel = require('../prototypes/Panel.js');
const PreviewFrame = require('../prototypes/Frames/PreviewFrame.js');
const {SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel;
const Vector = require('../prototypes/Vector.js');
//const List = require('../prototypes/List.js');
const btnAdd = make('button', {className : 'add-frame'}, 'add frame');
const Frames = new Panel('Frames', SNAP, new Vector(0, 0), 100, 100, TL, true);


let frames = [], currentFrame = 0;
Frames.mainInit = function () {

  //this.list = make(['div']); //new List('frames',[], 15);

  make([this.el, btnAdd/*, this.list.el*/]);
  this.list = ReactDOM.render(<List />, make(['div',{parent: this.el}]));
  this.list.setState({name : 'frames'});
  $(btnAdd).on('click.add', this.createFrame.bind(this));
};
Frames.update = function () {
  this.list.setState({items : frames});
};
Frames.createFrame = function () {
  this.sprite.addFrame();
};
Frames.deletePreview = function (index) {
  //this.list.remove(index);
  frames.splice(index, 1);
  this.update();
};
Frames.paintFrame = function (index) {
  //this.list.elements[index].paint();
  this.update();
};
Frames.addFrame = function () {
  this.sprite.addFrame();
};
Frames.selectFrame = function (index) {
  // console.log(previewFrames, index);
  // if (previewFrames[currentFrame]) {
  //   previewFrames[currentFrame].unSelectFrame();
  // }
  // previewFrames[index].selectFrame();
  // currentFrame = index;
};
Frames.addPreview = function (frame) {
  frames.push(frame);
  this.update();
  //this.list.add(new PreviewFrame(frame, frame.index == currentFrame, this.list), frame.index);
};
Frames.reAppend = function () {
  // for (let i = 0; i < previewFrames.length; i++) {
  //   previewFrames[i].remove();
  //   previewFrames[i].appendTo(ul);
  // }
};
Frames.resizeFrame = function (index) {
  //this.list.elements[index].resize();
};
module.exports = Frames;
