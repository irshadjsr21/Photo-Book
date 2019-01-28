const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/wallCalendar/categories');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.wallCalendarCategory,
  categoriesController.postWallCalendarCategory
);

router.get('/', categoriesController.getWallCalendarCategory);

router.delete('/:id', categoriesController.deleteWallCalendarCategory);

router.put(
  '/:id',
  validator.wallCalendarCategory,
  categoriesController.putWallCalendarCategory
);

module.exports = router;
