/*
  Johan Nordberg (origianl version - code@johan-nordberg.com)
*/

'use strict';
const EventEmitter = require('events').EventEmitter;
const browser = require('utils/browser.js');
const {inheritanceObject} = require('utils/object.js');
const gifWorker = require('workers/gif.worker.js');

let defaults = {
  workers: 2,
  repeat: 0,
  background: '#fff',
  quality: 10,
  width: null,
  height: null,
  transparent: null,
  preserveColors: false
},
frameDefaults = {
  delay: 500,
  copy: false,
  transparent : null
};

function GIF(options) {
  EventEmitter.call(this);
  this.running = false;
  this.options = {};
  this.frames = [];
  this.freeWorkers = [];
  this.activeWorkers = [];
  for (let key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      defaults[key] = options[key] === undefined ? defaults[key] : options[key];
    }
  }
  this.setOptions(defaults);
}
inheritanceObject(GIF, EventEmitter);

GIF.prototype.setOption = function (key, value) {
  this.options[key] = value;
  if ((this._canvas != null) && (key === 'width' || key === 'height')) {
    this._canvas[key] = value;
  }
};
GIF.prototype.setOptions = function (options) {
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      this.setOption(key, options[key]);
    }
  }
};
GIF.prototype.addFrame = function (image, options) {
  let frame = {
    transparent: this.options.transparent
  };

  options = options || {};
  for (let key in frameDefaults) {
    frame[key] = options[key] || frameDefaults[key];
  }
  if (!this.options.width) {
    this.setOption('width', image.width);
  }
  if (!this.options.height) {
    this.setOption('height', image.height);
  }
  if (image instanceof ImageData) {
    frame.data = image.data;
  } else if (image instanceof CanvasRenderingContext2D || image instanceof WebGLRenderingContext) {
    if (options.copy) {
      frame.data = this.getContextData(image);
    } else {
      frame.context = image;
    }
  } else if (!image.childNodes) {
    if (options.copy) {
      frame.data = this.getImageData(image);
    } else {
      frame.image = image;
    }
  } else {
    throw new Error('Invalid image');
  }
  this.frames.push(frame);
};
GIF.prototype.render = function () {
  let numWorkers;
  if (this.running) {
    throw new Error('Already running');
  }
  if (!this.options.width || !this.options.height) {
    throw new Error('Width and height must be set prior to rendering');
  }
  this.running = true;
  this.nextFrame = 0;
  this.finishedFrames = 0;
  this.imageParts = this.frames.map(function () {
    return null;
  });
  numWorkers = this.spawnWorkers();
  for (let i = 0; i < numWorkers; i++) {
    this.renderNextFrame();
  }
  this.emit('start');
  this.emit('progress', 0);
};
GIF.prototype.abort = function () {
  var worker;
  while (true) {
    worker = this.activeWorkers.shift();
    if (!worker) {
      break;
    }
    console.log("killing active worker");
    worker.terminate();
  }
  this.running = false;
  this.emit('abort');
};
GIF.prototype.spawnWorkers = function () {
  let numWorkers = Math.min(this.options.workers, this.frames.length),
    worker, diff = Math.abs(numWorkers - this.freeWorkers.length),
    self = this;
  for (let i = 0; i < diff; i++) {
    worker = gifWorker();
    worker.onmessage = function (event) {
      self.activeWorkers.splice(self.activeWorkers.indexOf(worker), 1);
      self.freeWorkers.push(worker);
      self.frameFinished(event.data);
      console.log(event.data);
    };
    this.freeWorkers.push(worker);
  }
  return numWorkers;
};
GIF.prototype.frameFinished = function (frame) {
  console.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active");
  this.finishedFrames++;
  this.emit('progress', this.finishedFrames / this.frames.length);
  this.imageParts[frame.index] = frame;
  if (this.imageParts.indexOf(null) >= 0) {
    this.renderNextFrame();
  } else {
    this.finishRendering();
  }
};
GIF.prototype.finishRendering = function () {
  let len = 0,
    frame, data, offset = 0,
    page;
  for (let i = 0; i < this.imageParts.length; i++) {
    frame = this.imageParts[i];
    len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
  }
  len += frame.pageSize - frame.cursor;
  console.log("rendering finished - filesize " + (Math.round(len / 1000)) + "kb");
  data = new Uint8Array(len);
  for (let i = 0; i < this.imageParts.length; i++) {
    frame = this.imageParts[i];
    for (let b = 0; b < frame.data.length; b++) {
      page = frame.data[b];
      data.set(page, offset);
      if (b === frame.data.length - 1) {
        offset += frame.cursor;
      } else {
        offset += frame.pageSize;
      }
    }
  }

  this.emit('finished', new Blob([data], {
    type: 'image/gif'
  }), data);
};
GIF.prototype.renderNextFrame = function () {
  let frame, task, worker;
  if (this.freeWorkers.length === 0) {
    throw new Error('No free workers');
  }
  if (this.nextFrame >= this.frames.length) {
    return;
  }
  frame = this.frames[this.nextFrame++];
  worker = this.freeWorkers.shift();
  task = this.getTask(frame);
  console.log("starting frame " + (task.index + 1) + " of " + this.frames.length);
  this.activeWorkers.push(worker);
  worker.postMessage(task);
};
GIF.prototype.getContextData = function (ctx) {
  return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
};
GIF.prototype.getImageData = function (image) {
  let ctx;
  if (!this._canvas) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = this.options.width;
    this._canvas.height = this.options.height;
  }
  ctx = this._canvas.getContext('2d');
  ctx.setFill = this.options.background;
  ctx.fillRect(0, 0, this.options.width, this.options.height);
  ctx.drawImage(image, 0, 0);
  return this.getContextData(ctx);
};
GIF.prototype.getTask = function (frame) {
  let index, task;
  index = this.frames.indexOf(frame);
  task = {
    index: index,
    last: index === (this.frames.length - 1),
    delay: frame.delay,
    transparent: frame.transparent,
    width: this.options.width,
    height: this.options.height,
    quality: this.options.quality,
    preserveColors: this.options.preserveColors,
    repeat: this.options.repeat,
    canTransfer: browser.name === 'chrome'
  };
  if (frame.data != null) {
    task.data = frame.data;
  } else if (frame.context != null) {
    task.data = this.getContextData(frame.context);
  } else if (frame.image != null) {
    task.data = this.getImageData(frame.image);
  } else {
    throw new Error('Invalid frame');
  }
  return task;
};

module.exports = GIF;
