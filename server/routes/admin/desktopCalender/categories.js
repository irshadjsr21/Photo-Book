const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/desktopCalender/categories');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.desktopCalenderCategory,
  categoriesController.postDesktopCalenderCategory
);

router.get('/', categoriesController.getDesktopCalenderCategory);

router.delete('/:id', categoriesController.deleteDesktopCalenderCategory);

router.put(
  '/:id',
  validator.desktopCalenderCategory,
  categoriesController.putDesktopCalenderCategory
);

module.exports = router;
