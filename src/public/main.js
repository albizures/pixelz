'use strict';

const Editor = require('./Editor');
const Animator = require('./panels/Animator.js');
const Palette = require('./panels/Palette.js');
const Frames = require('./panels/Frames.js');
const Info = require('./panels/Info.js');

const pencil = require('./tools/pencil.js');

window.onload = () => {
  window.Editor = Editor;
  //tools
  pencil();

  //panels
  Animator();
  Frames();
  Palette();
  Info();

  //init
  Editor.init();
};
