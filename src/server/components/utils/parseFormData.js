
module.exports = function (req, res, next) {
  req.body = JSON.parse(req.body.body);
  next();
};