'use strict';
const co = require('co');
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const files = require('../../components/utils/files.js');
const db = require('../../components/connect.js');

exports.post = function (req, res) {
  let type = req.body.type;

  co(function* () {
    let date = new Date();
    var id = yield model.post({
      user : req.user._id,
      name: req.body.name,
      modificatedAt: date,
      createdAt : date,
      width: req.body.width,
      height: req.body.height,
      private : req.body.private,
      colors: req.body.colors,
      type: type,
      frames: req.body.frames,
      layers : req.body.layers
    });
    id = id.toString();

    let file = req.files.shift();
    let namePreview = Date.now() + '.' + type;
    let preview = yield files.write(namePreview, file.buffer);

    
    file = req.files.shift();
    let nameSpriteFile = Date.now() + '.png';
    let spriteFile = yield files.write(nameSpriteFile, file.buffer);

    yield model.put(id, {
      available : true,
      file: '/' + nameSpriteFile,
      preview: '/' + namePreview
    });
    return id;
  })
  .then(value => res.json(response.generate(0, value)))
  .catch(err => {
    console.log('catch', err);
    res.json(response.generate(1, err));
  });
};


exports.getFile = function (req, res) {
  model.getSearch({
    _id: db.newId(req.params.id),
    user: req.user._id
  }, {
    file: 1
  }, onSearch);
  function onSearch(result) {
    if (result.code !== 0) {
      return res.status(500).end();
    }
    res.sendFile(files.join(files.FILES_PATH, result.data.file), function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:',  result.data.file);
    }
  });
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
  var historyPath = files.join(newName);


  co(function *() {
    let sprite = yield model.getOne(id);
    let fileTemp = sprite.file;
    let previewTemp = sprite.preview;

    let file = req.files.shift();
    let namePreview = Date.now() + '.' + type;
    let preview = yield files.write(namePreview, file.buffer);

    file = req.files.shift();
    let nameSpriteFile = Date.now() + '.png';
    let spriteFile = yield files.write(nameSpriteFile, file.buffer);

    sprite.name = req.body.name;
    sprite.width = req.body.width;
    sprite.height = req.body.height;
    sprite.private = req.body.private;
    sprite.colors= req.body.colors;
    sprite.type = type;
    sprite.frames = req.body.frames;
    sprite.layers = req.body.layers;
    sprite.file = '/' + nameSpriteFile;
    sprite.preview = '/' + namePreview;

    yield model.put(sprite._id, sprite);
    yield model.postHistory({
      file: fileTemp,
      preview: previewTemp
    });

    return sprite._id;
  })
  .then(value => res.json(response.generate(0, value)))
  .catch(err => {
    console.log('catch', err);
    res.json(response.generate(1, err));
  });


  

  // function onGetOne(result) {
  //   if (result.code !== 0) {
  //     return res.json(result);
  //   }
  //   current = result.data;
  //   files.move(
  //     files.join(name),
  //     historyPath,
  //     onMove
  //   );
  // }
  // function onMove(result) {
  //   if (result.code !== 0) {
  //     return res.json(result);
  //   }
  //   files.remove(
  //     files.join(id + '_p.' + current.type), 
  //     onRemove
  //   );
  // }
  // function onRemove(result) {
  //   if (result.code !== 0) {
  //     return res.json(result);
  //   }
  //   postFile(
  //     true,
  //     id,
  //     result => postFile(false, id, onPostFile)
  //   );
  // }

  // function postFile(isPreview, id, cb) {
  //   let file = req.files.shift();
  //   let name = isPreview? id + '_p.' + type : id + '.png';
  //   let path = files.join(name);
  //   files.write(
  //     path,
  //     file.buffer,
  //     result => {
  //       if (result.code !== 0) {
  //         return res.json(result);
  //       }
  //       cb(result, id);
  //     }
  //   );
  // }
  // function onPostFile(result, id) {
  //   response.commonPutHistory(res, model.put, req.params.id, {
  //     name: req.body.name,
  //     width: req.body.width,
  //     height: req.body.height,
  //     private : req.body.private,
  //     colors: req.body.colors,
  //     type: type,
  //     frames: req.body.frames,
  //     layers : req.body.layers
  //   }, Object.assign({}, current, {
  //     path : historyPath,
  //     _id : historyId,
  //     modificationDate: date
  //   }));
  // }
};

exports.putName = function (req, res) {
  response.commonPut(res, model.putName, req.params.id, req.body.name);
};