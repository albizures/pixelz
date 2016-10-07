const router = require('express').Router();
const controller = require('./editor.ctrl.js');

router.get('/', controller.getLast);
router.get('/user', controller.getAll);
router.post('/', controller.post);

router.put('/:id', controller.put);

module.exports = router;