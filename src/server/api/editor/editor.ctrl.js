const { newId } = require('../../components/connect.js');
const model = require('./editor.mdl.js');
const response = require('../../components/utils/response.js');


exports.getLast = function (req, res) {
  response.promise(
    model.getLast(newId(req.user._id)),
    res,
    201,
    500
  );
};

exports.put = function (req, res) {
  res.json([]);
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