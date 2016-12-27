const router = require('express').Router();
const controller = require('./editor.ctrl.js');
const { ensureAuth } = require('../../components/utils/auth.js');

router.get('/', ensureAuth, controller.getAll);
router.get('/user', ensureAuth, controller.getAllOfUser);
router.get('/user/last', ensureAuth, controller.getLast);
router.post('/', ensureAuth, controller.post);

router.put('/:id', ensureAuth, controller.isOwner, controller.put);

module.exports = router;