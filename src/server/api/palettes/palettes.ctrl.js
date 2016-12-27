const co = require('co');
const _ = require('lodash');
const model = require('./palettes.mdl.js');
const modelUsers = require('../users/users.mdl.js');
const response = require('../../components/utils/response.js');

exports.isOwner = (req, res, next) =>
  model.getOne(req.params.id, req.user._id)
    .then(palette => {
      if (palette) {
        return next();
      }
      res.status(401);
    }).catch(response.serverError(res));


exports.post = (req, res) => co(function* () {
  let user;
  if (!req.user) {
    let anonymous = yield modelUsers.findByUsernameOrCreate('anonymous', {
      username: 'anonymous',
      displayName: 'Anonymous',
      email: 'anonymous@pixore.com',
      twitterID: 0
    });
    user = anonymous._id;
  } else {
    user = req.user._id;
  }

  let palette = yield model.create({
    title: req.body.title,
    user: user,
    colors: req.body.colors,
    private: req.body.private
  });
  return palette;
}).then(response.created(res))
  .catch(response.serverError(res));

exports.getOne = (req, res) => {
  var promise;
  console.log('getOne', req.params.id);
  if (req.user) {
    promise = model
      .getOne(req.params.id, req.user._id)
      .then(palette => palette || model.getOnePublic(req.params.id));
  } else {
    promise = model.getOnePublic(req.params.id);
  }
  promise
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res));
};

exports.getPublic = (req, res) =>
  model.getPublic()
    .then(response.OK(res))
    .catch(response.serverError(res));


exports.getSearch = function (req, res) {
  response.commonData(res, model.getSearch, req.query);
};

exports.put = (req, res) =>
  model.update(
    req.params.id,
    _.pick(req.body, ['title', 'colors', 'private'])
  ).then(response.OK(res))
    .catch(response.serverError(res));