const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/wallCalendar/product');
const validator = require('../../../middlewares/adminValidator');
const upload = require('../../../middlewares/upload');

router.post(
  '/',
  upload.single('image'),
  validator.postWallCalendar,
  productController.postWallCalendar
);

router.get('/', productController.getWallCalendar);

router.delete('/:id', productController.deleteWallCalendar);

router.post(
  '/:id',
  upload.single('image'),
  validator.putWallCalendar,
  productController.putWallCalendar
);

module.exports = router;
