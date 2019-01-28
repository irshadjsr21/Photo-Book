const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/photoBook');

router.get('/category', controller.getPhotoBookCategory);

router.get('/', controller.getPhotoBook);

module.exports = router;
