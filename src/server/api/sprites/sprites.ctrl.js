'use strict';
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const db = require('../../components/connect.js');

exports.post = function (req, res) {
  let numFrames = req.files.length - 1;
  let generalResult;
  let frames = [];
  let main;
  let type = req.body.type;
  
  model.post({
    user : db.newId('5761fcf1a4a36ca01877f912'),
    name: req.body.name,
    width: req.body.width,
    height: req.body.height,
    colors: req.body.colors,
    type : type,
    frames: [],
  }, onPost);

  function onPost(result) {
    let nameFile =  result.data + '.' + type;
    if (result.code !== 0) {
      return res.json(result);
    }
    generalResult = result;
    model.postFile({
      buffer : req.files[0].buffer,
      name : nameFile,
      meta : {
        sprite : result.data,
        type : type
      }
    }, result => onPostMain(result, nameFile));
    req.files.splice(0, 1);
  }
  function onPostMain(result, nameFile) {
    main = {_id : result.data, file : nameFile};
    for (let j = 0; j < req.files.length; j++) {
      let element = req.files[j];
      let nameFile = result.data + '_' + j + '.png';
      model.postFile({
        buffer : req.files[j].buffer,
        name : nameFile,
        meta : {
          sprite : result.data,
          type : 'png'
        }
      }, result => onPostFrame(result, j, nameFile));
    }
  }
  function onPostFrame(result, index, nameFile) {
    frames[index] = {_id : result.data, file : nameFile};
    numFrames--;
    if (numFrames === 0) {
      model.update(generalResult.data, {
        main : main,
        frames : frames
      }, onUpdate);
    }
  }
  function onUpdate(result) {
    res.json(generalResult);
  }
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