'use strict';
const response = require('../../components/utils/response.js');
const config = require('../../config/environment');
const path = require('path');

exports.getFile = function (req, res) {
  var fileName = path.join(config.FILES_PATH, 's', req.params.id + '.png');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
};

exports.getProfile = function (req, res) {
  var fileName = path.join(config.FILES_PATH, name);
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
};