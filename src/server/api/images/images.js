const router = require('express').Router();
const controller = require('./images.ctrl.js');

router.get('/sprite/:id', controller.getFile);

module.exports = router;