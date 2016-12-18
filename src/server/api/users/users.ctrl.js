const model = require('./users.mdl.js');
const response = require('../../components/utils/response.js');

exports.post = (req, res) =>
  model.post(req.body)
    .then(response.created(res))
    .catch(response.serverError(res));

exports.getOne = (req, res) =>
  model.getOne(req.params.id)
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.getAll = (req, res) =>
  model.getAll()
    .then(response.OK(res))
    .catch(response.serverError(res));

exports.getSearch = (req, res) => 
  model.getSearch(req.querymen)
    .then(response.OK(res))
    .catch(response.serverError(res));