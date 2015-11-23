'use strict';

const Editor = require("./Editor");
const Animator = require("./panels/Animator.js");
const Frames = require("./panels/Frames.js");
const pencil = require("./tools/pencil.js");

window.onload = () => {
  window.Editor = Editor;
  //tools
  pencil();

  //panels
  Animator();
  Frames();

  //init
  Editor.init();
}
