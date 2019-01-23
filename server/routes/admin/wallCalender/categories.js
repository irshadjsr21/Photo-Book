const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/wallCalender/categories');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.wallCalenderCategory,
  categoriesController.postWallCalenderCategory
);

router.get('/', categoriesController.getWallCalenderCategory);

router.delete('/:id', categoriesController.deleteWallCalenderCategory);

router.put(
  '/:id',
  validator.wallCalenderCategory,
  categoriesController.putWallCalenderCategory
);

module.exports = router;
