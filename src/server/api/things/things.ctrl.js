const model = require('./things.mdl.js');
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

exports.postFile = function (req, res) {
  model.postFile({
    buffer : req.files[0].buffer,
    name : Date.now(),
    meta : req.body
  }, result => console.log(result));
  res.json([]);
};