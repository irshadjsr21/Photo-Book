const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/photoBook/product');
const validator = require('../../../middlewares/adminValidator');
const upload = require('../../../middlewares/upload');

router.post(
  '/',
  upload.single('image'),
  validator.postPhotoBook,
  productController.postPhotoBook
);

router.get('/', productController.getPhotoBook);

router.delete('/:id', productController.deletePhotoBook);

router.post(
  '/:id',
  upload.single('image'),
  validator.putPhotoBook,
  productController.putPhotoBook
);

module.exports = router;
