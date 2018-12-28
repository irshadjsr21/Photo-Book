const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/mugs/product');
const validator = require('../../../middlewares/validator');
const upload = require('../../../middlewares/upload');

router.post('/', upload.single('image'),validator.mug, productController.postMug);

router.get('/', productController.getMug);

router.delete('/:id', productController.deleteMug);

router.post('/:id', upload.single('image'), validator.mug, productController.putMug);

module.exports = router;