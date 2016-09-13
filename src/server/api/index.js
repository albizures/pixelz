const router = require('express').Router();

router.use('/things/', require('./things/things.js'));
router.use('/users/', require('./users/users.js'));
router.use('/sprites/', require('./sprites/sprites.js'));
router.use('/images/', require('./images/images.js'));
router.use('/palettes/', require('./palettes/palettes.js'));
router.use('/*', function (req, res) {
  res.status(404).end();
});
module.exports = router;