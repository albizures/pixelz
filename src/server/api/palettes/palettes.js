const router = require('express').Router();
const controller = require('./palettes.ctrl.js');

router.get('/', controller.getAll);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);

router.post('/', controller.post);

router.put('/:id', controller.put);

module.exports = router;