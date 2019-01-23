const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/photoBook/categories');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.photoBookCategory,
  categoriesController.postPhotoBookCategory
);

router.get('/', categoriesController.getPhotoBookCategory);

router.delete('/:id', categoriesController.deletePhotoBookCategory);

router.put(
  '/:id',
  validator.photoBookCategory,
  categoriesController.putPhotoBookCategory
);

module.exports = router;
