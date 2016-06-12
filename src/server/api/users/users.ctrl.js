const model = require('./users.mdl.js');
const response = require('../../components/utils/response.js');

exports.post = function (req, res) {
  response.commonData(res, model.post, req.body);
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