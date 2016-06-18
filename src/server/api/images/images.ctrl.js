'use strict';
const model = require('./images.mdl.js');
const response = require('../../components/utils/response.js');
const db = require('../../components/connect.js');

exports.getFile = function (req, res) {
  response.commoFile(res, model.getFile, req.params.name, 'png');
};