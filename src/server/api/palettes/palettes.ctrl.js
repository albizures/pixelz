const db = require('../../components/connect.js');
const model = require('./palettes.mdl.js');
const response = require('../../components/utils/response.js');

exports.post = function (req, res) {
  var date = new Date();
  console.log(req.body);
  response.commonData(res, model.post, {
    name : req.body.name,
    user : db.newId('5761fcf1a4a36ca01877f912'),
    modificationDate: date,
    creationDate : date,
    colors : req.body.colors,
    public : req.body.public
  });
};

exports.getOne = function (req, res) {
  if(!db.validId(req.params.id)) {
    return res.json(response.commonResult('Invalid id'));
  }
  response.commonData(res, model.getOne, req.params.id);
};

exports.getAll = function (req, res){
  response.common(res, model.getAll);
};

exports.getSearch = function (req, res) {
  response.commonData(res, model.getSearch, req.query);
};

exports.put = function (req, res) {
  
};