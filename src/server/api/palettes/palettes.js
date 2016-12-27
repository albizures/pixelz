const router = require('express').Router();
const controller = require('./palettes.ctrl.js');

const {isOwner} = controller;

router.get('/', controller.getPublic);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);

router.post('/', controller.post);

router.put('/:id', isOwner, controller.put);

module.exports = router;