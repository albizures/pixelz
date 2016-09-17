const router = require('express').Router();
const controller = require('./images.ctrl.js');

router.get('/sprite/:id', controller.getFile);
router.get('/:name', controller.getProfile);

module.exports = router;