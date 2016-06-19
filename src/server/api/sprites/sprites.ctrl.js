'use strict';
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const files = require('../../components/utils/files.js');
const db = require('../../components/connect.js');
const folderSprite = 's';

exports.post = function (req, res) {
  let generalResult;
  let type = req.body.type;
  console.log(req.files.length);
  model.post({
    user : db.newId('5761fcf1a4a36ca01877f912'),
    name: req.body.name,
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
    let path = files.join(folderSprite, name);
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
    model.update(id, {
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