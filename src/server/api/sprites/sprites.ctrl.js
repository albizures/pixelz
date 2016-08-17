'use strict';
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const files = require('../../components/utils/files.js');
const db = require('../../components/connect.js');
const spritesFolder = 's';
const historyFolder = 'h';

exports.post = function (req, res) {
  let generalResult;
  let date = new Date();
  let type = req.body.type;
  console.log(req.files.length);
  model.post({
    user : db.newId('576209aca666379a7acd5d18'),
    name: req.body.name,
    modificationDate: date,
    creationDate : date,
    width: req.body.width,
    height: req.body.height,
    private : req.body.private,
    colors: req.body.colors,
    type: type,
    frames: req.body.frames,
    layers : req.body.layers
  }, onPost);

  function onPost(result) {
    let id;
    if (result.code !== 0) {
      return res.json(result);
    }
    generalResult = result;
    id = result.data.toString();
    postFile(
      true,
      id,
      result => postFile(false, id, onPostFile)
    );
  }
  function postFile(isPreview, id, cb) {
    let file = req.files.shift();
    let name = isPreview? id + '_p.' + type : id + '.png';
    let path = files.join(spritesFolder, name);
    files.write(
      path,
      file.buffer,
      result => {
        if (result.code !== 0) {
          return res.json(result);
        }
        cb(result, id);
      }
    );
  }
  function onPostFile(result, id) {
    model.put(id, {
      available : true
    }, onUpdate);
  }
  function onUpdate(result) {
    if (result.code !== 0) {
      res.json(result);
    }
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

exports.put = function (req, res) {
  var current;
  var date = new Date();
  var id = req.params.id;
  var type = req.body.type;
  var name = id + '.png';
  var historyId = db.newId();
  var newName = historyId + '.png';
  var historyPath = files.join(spritesFolder, historyFolder, newName);

  model.getOne(id, onGetOne);

  function onGetOne(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    current = result.data;
    files.move(
      files.join(spritesFolder, name),
      historyPath,
      onMove
    );
  }
  function onMove(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    files.remove(
      files.join(spritesFolder, id + '_p.' + current.type), 
      onRemove
    );
  }
  function onRemove(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    postFile(
      true,
      id,
      result => postFile(false, id, onPostFile)
    );
  }

  function postFile(isPreview, id, cb) {
    let file = req.files.shift();
    let name = isPreview? id + '_p.' + type : id + '.png';
    let path = files.join(spritesFolder, name);
    files.write(
      path,
      file.buffer,
      result => {
        if (result.code !== 0) {
          return res.json(result);
        }
        cb(result, id);
      }
    );
  }
  function onPostFile(result, id) {
    response.commonPutHistory(res, model.put, req.params.id, {
      name: req.body.name,
      width: req.body.width,
      height: req.body.height,
      private : req.body.private,
      colors: req.body.colors,
      type: type,
      frames: req.body.frames,
      layers : req.body.layers
    }, Object.assign({}, current, {
      path : historyPath,
      _id : historyId,
      modificationDate: date
    }));
  }
};

exports.putName = function (req, res) {
  response.commonPut(res, model.putName, req.params.id, req.body.name);
};