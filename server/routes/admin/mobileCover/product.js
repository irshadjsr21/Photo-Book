const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/mobileCover/product');
const validator = require('../../../middlewares/adminValidator');
const upload = require('../../../middlewares/upload');

router.post(
  '/',
  upload.single('image'),
  validator.postMobileCover,
  productController.postMobileCover
);

router.get('/', productController.getMobileCover);

router.delete('/:id', productController.deleteMobileCover);

router.post(
  '/:id',
  upload.single('image'),
  validator.putMobileCover,
  productController.putMobileCover
);

module.exports = router;
