const router = require('express').Router();
const controller = require('./editor.ctrl.js');

router.get('/', controller.getLast);

router.post('/', controller.post);

router.put('/:id', controller.put);

module.exports = router;