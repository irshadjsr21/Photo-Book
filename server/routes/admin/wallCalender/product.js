const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/wallCalender/product');
const validator = require('../../../middlewares/validator');
const upload = require('../../../middlewares/upload');

router.post('/', upload.single('image'), validator.wallCalender, productController.postWallCalender);

router.get('/', productController.getWallCalender);

router.delete('/:id', productController.deleteWallCalender);

router.post('/:id', upload.single('image'), validator.wallCalender, productController.putWallCalender);

module.exports = router;