const router = require('express').Router();
const controller = require('./auth.ctrl.js');
const { passport } = require('../../config/passport.js');
const { ensureAuth } = require('../../components/utils/auth.js');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/whoami', ensureAuth, controller.whoAmI);

router.get('/logout', ensureAuth, controller.logout);

module.exports = router;