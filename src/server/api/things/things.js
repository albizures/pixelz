const router = require('express').Router();
const controller = require('./things.ctrl.js');

router.get('/', controller.getAll);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);


router.post('/', controller.post);

module.exports = router;