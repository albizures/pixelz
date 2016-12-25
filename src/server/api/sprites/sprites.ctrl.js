const co = require('co');
const model = require('./sprites.mdl.js');
const response = require('../../components/utils/response.js');
const files = require('../../components/utils/files.js');
const db = require('../../components/connect.js');

exports.post = (req, res) => co(function* () {
  let type = req.body.type;
  var {_id: id} = yield model.create({
    user: req.user._id,
    title: req.body.title,
    width: req.body.width,
    height: req.body.height,
    private: req.body.private,
    colors: req.body.colors,
    type: type,
    frames: req.body.frames,
    layers: req.body.layers
  });
  let file = req.files.shift();
  let namePreview = Date.now() + '.' + type;
  yield files.write(namePreview, file.buffer);

  file = req.files.shift();
  let nameSpriteFile = Date.now() + '.png';
  yield files.write(nameSpriteFile, file.buffer);

  return yield model.update(id, {
    available: true,
    file: '/' + nameSpriteFile,
    preview: '/' + namePreview
  });
}).then(response.created(res))
  .catch(response.serverError(res));

exports.getHistory = (req, res) =>
  model.getHistory(req.params.id)
    .then(response.OK(res))
    .catch(response.serverError(res));

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
      } else {
        console.log('Sent:', result.data.file);
      }
    });
  }
};

exports.getOne = (req, res) => {
  var promise;
  if (req.user) {
    promise = model.getOne(req.params.id, req.user._id);
  } else {
    promise = model.getOnePublic(req.params.id);
  }
  promise
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res));
};

exports.getPublic = function (req, res) {
  response.promise(
    model.getPublic(),
    res,
    200,
    500
  );
};

exports.getAll = (req, res) =>
  model.getAll()
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.getSearch = function (req, res) {
  response.commonData(res, model.getSearch, req.query);
};

exports.put = (req, res) => co(function *() {
  let id = req.params.id;
  let type = req.body.type;
  let sprite = yield model.getOne(id, req.user._id);
  let fileTemp = sprite.file;
  let previewTemp = sprite.preview;

  let file = req.files.shift();
  let namePreview = Date.now() + '.' + type;
  yield files.write(namePreview, file.buffer);

  file = req.files.shift();
  let nameSpriteFile = Date.now() + '.png';
  yield files.write(nameSpriteFile, file.buffer);

  let history = yield model.createHistory({
    file: fileTemp,
    preview: previewTemp
  });
  console.log([history].concat(sprite.history));
  sprite = yield model.update(sprite._id, {
    title: req.body.title || sprite.title,
    width: req.body.width || sprite.width,
    height: req.body.height || sprite.height,
    private: req.body.private || sprite.private,
    colors: req.body.colors || sprite.colors,
    type: type || sprite.type,
    frames: req.body.frames || sprite.frames,
    layers: req.body.layers || sprite.layers,
    file: '/' + nameSpriteFile,
    preview: '/' + namePreview,
    history: [history].concat(sprite.history)
  });

  return sprite;
}).then(response.OK(res))
  .catch(response.serverError(res));

exports.putName = (req, res) =>
  model.updateName(req.params.id, req.body.name)
    .then(response.OK(res))
    .catch(response.serverError(res));