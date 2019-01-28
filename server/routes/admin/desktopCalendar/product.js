const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/desktopCalendar/product');
const validator = require('../../../middlewares/adminValidator');
const upload = require('../../../middlewares/upload');

router.post(
  '/',
  upload.single('image'),
  validator.postDesktopCalendar,
  productController.postDesktopCalendar
);

router.get('/', productController.getDesktopCalendar);

router.delete('/:id', productController.deleteDesktopCalendar);

router.post(
  '/:id',
  upload.single('image'),
  validator.putDesktopCalendar,
  productController.putDesktopCalendar
);

module.exports = router;
