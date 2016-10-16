const http = require('http');
const React = require('react');
const Gif = require('utils/gif/gif.js');
const { noTransparent } = require('utils/canvas.js');
const { ModalManager } = require('react-dynamic-modal');
const Login = require('../../../../modals/Login.js');

exports.onResize = function () {
  alert('resize');
};

exports.onSetBackground = function () {
  alert('setBackgroud');
};

exports.onLogin = function () {
  console.log('now save the sprite');
};

exports.onSave = function () {
  if (!this.props.user) {
    return ModalManager.open(<Login onLogin={this.onLogin}/>);
  }
  let self = this;
  let sprite = this.props.sprite;
  let numFrames = sprite.frames.length;
  let numLayers = this.props.frames[sprite.frames[0]].layers.length;
  let isGif = sprite.frames.length > 1;
  let isNew = !sprite._id;
  let context = document.createElement('canvas').getContext('2d');
  let width = numLayers * sprite.width;
  let height = numFrames * sprite.height;
  let files = [];

  context.canvas.width = width;
  context.canvas.height = height;

  sprite.frames.forEach((item, index) => {
    let frame = this.saveFrame(item);
    context.drawImage(frame.canvas,
      0, 0, width, sprite.height,
      0, sprite.height * index, width, sprite.height
    );
  });
  isGif ?
    this.generateGif(sprite, 1, onGeneratePreview)
    : this.props.frames[sprite.frames[0]].context.canvas.toBlob(onGeneratePreview);

  function onGeneratePreview(blob) {
    files.push({file: blob, name: 'preview.'  + (isGif ? 'gif' : 'png')});
    context.canvas.toBlob(onGenerateBlob);
  }
  function onGenerateBlob(blob) {
    var method, url;
    if (isNew) {
      method = 'POST';
      url = '/api/sprites';
    } else {
      method = 'PUT';
      url = '/api/sprites/' + sprite._id;
    }

    files.push({file: blob, name: 'sprite.png'});

    http.upload(url, {
      name: sprite.name,
      width: sprite.width,
      height: sprite.height,
      frames: numFrames,
      layers: numLayers,
      type: isGif ? 'gif' : 'png',
      private: false,
      colors: sprite.palette
    }, files, method, onUpload.bind(self));
  }

  function onUpload(result) {
    if (isNew) {
      this.props.setSpriteId(this.props.sprite.index, result.description);
      this.props.saveEditor();
    }
    console.log('save result', result);
  }
  return context.canvas;
};


exports.generateGif = function (sprite, scale, cb) {
  let gif = new Gif({
    quality: 1,
    repeat: 0,
    height: sprite.height * scale,
    width: sprite.width * scale,
    preserveColors: true
  });
  gif.on('finished', cb);

  generate.call(this, sprite.transparent);

  function generate(transparent) {
    let transparentDec = parseInt(transparent.substring(1), 16);
    for (let i = 0; i < sprite.frames.length; i++) {
      gif.addFrame(
        noTransparent(this.props.frames[sprite.frames[i]].context, scale, transparent),
        {
          transparent: transparentDec
        }
      );
    }
    gif.render();
  }
};


exports.saveFrame = function (index) {
  let frame = this.props.frames[index];
  let context = document.createElement('canvas').getContext('2d');
  context.canvas.width = frame.layers.length * frame.width;
  context.canvas.height = frame.height;
  frame.layers.forEach(onForEach.bind(this));

  function onForEach(item, index) {
    let layer = this.props.layers[item];
    context.drawImage(layer.context.canvas,
      0, 0, layer.width, layer.height,
      index * layer.width , 0, layer.width, layer.height
    );
  }
  return context;
};