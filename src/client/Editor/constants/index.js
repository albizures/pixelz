'use strict';
let transparent = document.createElement("img"),
  gradient = document.createElement("img"),
  rainbow = document.createElement("img"),
  backgroundTransparent = document.createElement('canvas').getContext('2d'),
  scala = 0.3;
transparent.addEventListener('load', function () {
  let width = backgroundTransparent.canvas.width = this.width * scala,
      height = backgroundTransparent.canvas.height = this.height * scala;
  backgroundTransparent.drawImage(this, 0, 0, this.width, this.height, 0, 0, width, height);
});
backgroundTransparent.canvas.img = transparent;
rainbow.src = require('../../assets/images/rainbow.png');
gradient.src = require('../../assets/images/gradient.png');
transparent.src = require('../../assets/images/transparent.png');

export const GRADIENT = gradient;
export const RAINBOW = rainbow;
export const HEIGHT_DEF = 40;
export const WIDTH_DEF = 40;
export const SCALE_DEF = 10;
export const TRANSPARENT_IMG = backgroundTransparent.canvas;
export const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';
export const TRANSPARENT_COLOR_VALUE = '';
export const SIZE_POINTER_DEF = 1;
export const COLOR_POINTER_PREW_DEF = 'rgba(255, 255, 255, 0.6)';
export const SECOND_COLOR_POINTER_PREW_DEF = 'rgba(0, 0, 0, 0.2)';
export const RIGHT_CLICK = 3;
export const LEFT_CLICK = 1;
export const MIDDLE_CLICK = 2;
export const PALETTE = 'Palette';
export const FRAMES = 'Frames';


export * from '../../assets/images/transparent.png';
export * from './palette';
export * from './events';
export * from './actions';
