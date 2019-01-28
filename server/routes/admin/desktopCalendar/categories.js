const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/desktopCalendar/categories');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.desktopCalendarCategory,
  categoriesController.postDesktopCalendarCategory
);

router.get('/', categoriesController.getDesktopCalendarCategory);

router.delete('/:id', categoriesController.deleteDesktopCalendarCategory);

router.put(
  '/:id',
  validator.desktopCalendarCategory,
  categoriesController.putDesktopCalendarCategory
);

module.exports = router;
