const router = require('express').Router();
const controller = require('./images.ctrl.js');

router.get('/:name', controller.getFile);

module.exports = router;