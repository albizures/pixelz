const router = require('express').Router();
const controller = require('./sprites.ctrl.js');
const { ensureAuth } = require('../../components/utils/auth.js');
const parseFormData = require('../../components/utils/parseFormData.js');
const multer = require('multer');
const upload = multer();

router.get('/', controller.getAll);
router.get('/public', controller.getPublic);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);
router.get('/:id/history', controller.getHistory);
router.get('/:id/file', ensureAuth, controller.getFile);

router.post('/', upload.array('files'), parseFormData, controller.post);

router.put('/:id', ensureAuth, upload.array('files'), parseFormData, controller.put);
router.put('/:id/name', ensureAuth, controller.putName);
module.exports = router;