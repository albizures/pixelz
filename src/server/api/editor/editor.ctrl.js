const model = require('./editor.mdl.js');
const response = require('../../components/utils/response.js');
const pick = require('lodash.pick');

exports.isOwner = (req, res, next) =>
  model.findOneOfUser(req.params.id, req.user._id)
    .then(palette => {
      if (palette) {
        return next();
      }
      res.status(401);
    }).catch(response.serverError(res));


exports.getAllOfUser = (req, res) =>
  model.findAllOfUser(req.user._id)
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.getLast = (req, res) =>
  model.findLastOfUser(req.user._id)
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.getAll = (req, res) =>
  model.findAll()
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.put = (req, res) => {
  model.update(req.params.id, pick(req.body, ['title', 'palette', 'layout', 'sprites']))
    .then(response.OK(res))
    .catch(response.serverError(res));
};

exports.post = function (req, res) {
  req.body.user = req.user._id;
  model.create(req.body)
    .then(response.created(res))
    .catch(response.serverError(res));
};