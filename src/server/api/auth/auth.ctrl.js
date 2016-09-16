const response = require('../../components/utils/response.js');

exports.logout = function (req, res) {
  req.logout();

  res.redirect('/');
};

exports.whoAmI = function (req, res) {
  res.json(req.user);
};