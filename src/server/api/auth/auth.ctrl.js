
exports.logout = function (req, res) {
  req.logout();

  res.redirect('/');
};

exports.whoAmI = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!req.user) {
    res.status(401);
  }
  res.json(req.user);
};