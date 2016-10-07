const { newId } = require('../../components/connect.js');
const model = require('./editor.mdl.js');
const response = require('../../components/utils/response.js');


exports.getLast = function (req, res) {
  response.promise(
    model.getLast(req.user._id),
    res,
    200,
    500
  );
};

exports.getAll = function (req, res) {
  response.promise(
    model.getAll(newId(req.user._id)),
    res
  );
};

exports.put = function (req, res) {
  response.promise(
    model.put(newId(req.params.id), newId(req.user._id), req.body),
    res
  );
};

exports.post = function (req, res) {
  req.body.user = newId(req.user._id);
  response.promise(
    model.post(req.body),
    res,
    201,
    500
  );
};