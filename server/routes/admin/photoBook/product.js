const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/photoBook/product');
const validator = require('../../../middlewares/validator');
const upload = require('../../../middlewares/upload');

router.post('/', upload.single('image'), validator.photoBook, productController.postPhotoBook);

router.get('/', productController.getPhotoBook);

router.delete('/:id', productController.deletePhotoBook);

router.post('/:id', upload.single('image'), validator.photoBook, productController.putPhotoBook);

module.exports = router;