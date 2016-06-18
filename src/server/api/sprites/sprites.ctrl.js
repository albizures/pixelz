'use strict';
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const db = require('../../components/connect.js');

exports.post = function (req, res) {
  let numFrames = req.files.length - 1;
  let generalResult;
  let frames = [];
  let main;
  
  model.post({
    user : db.newId('5761fcf1a4a36ca01877f912'),
    name: req.body.name,
    width: req.body.width,
    height: req.body.height,
    colors: req.body.colors,
    frames: [],
  }, onPost);
  // response.commonData(res, model.post, req.body);

  function onPost(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    generalResult = result;
    model.postFile({
      buffer : req.files[0].buffer,
      name : result.data + '.png',
      meta : {
        sprite : result.data
      }
    }, onPostMain);
    req.files.splice(0, 1);
  }
  function onPostMain(result) {
    main = result.data;
    for (let j = 0; j < req.files.length; j++) {
      let element = req.files[j];
      model.postFile({
        buffer : req.files[j].buffer,
        name : result.data + '_' + j + '.png',
        meta : {
          sprite : result.data
        }
      }, result => onPostFrame(result, j));
    }
  }
  function onPostFrame(result, index) {
    frames[index] = result.data;
    numFrames--;
    if (numFrames === 0) {
      model.update(generalResult.data, {
        main : main,
        frames : frames
      }, onUpdate);
    }
  }
  function onUpdate(result) {
    console.log(result);
    res.json(generalResult);
  }
};

exports.test = function (req, res) {
  res.type('png');
  db.getFile(db.newId(req.params.id), result => res.send(result.data));
};

exports.getOne = function (req, res) {
  response.commonData(res, model.getOne, req.params.id);
};

exports.getAll = function (req, res){
  response.common(res, model.getAll);
};

exports.getSearch = function (req, res) {
  response.commonData(res, model.getSearch, req.query);
};