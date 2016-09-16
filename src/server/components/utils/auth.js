
exports.ensureAuth = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send({error: 'not authenticated'})
};