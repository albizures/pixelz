const router = require('express').Router();
const controller = require('./things.ctrl.js');
const parseFormData = require('../../components/utils/parseFormData.js');
const multer  = require('multer');
const upload = multer();

router.get('/', controller.getAll);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);

router.post('/file', upload.array('files'), parseFormData, controller.postFile);
router.post('/', controller.post);

module.exports = router;

