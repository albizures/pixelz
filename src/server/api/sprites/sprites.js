const router = require('express').Router();
const controller = require('./sprites.ctrl.js');
const parseFormData = require('../../components/utils/parseFormData.js');
const multer  = require('multer');
const upload = multer();

router.get('/', controller.getAll);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getOne);

router.post('/', upload.array('files'), parseFormData, controller.post);

module.exports = router;