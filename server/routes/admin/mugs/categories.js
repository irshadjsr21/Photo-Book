const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/mugs/categories');
const validator = require('../../../middlewares/adminValidator');

router.post('/', validator.mugCategory, categoriesController.postMugCategory);

router.get('/', categoriesController.getMugCategory);

router.delete('/:id', categoriesController.deleteMugCategory);

router.put('/:id', validator.mugCategory, categoriesController.putMugCategory);

module.exports = router;
