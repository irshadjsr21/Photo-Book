const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/mug');

router.get('/category', controller.getMugCategory);

router.get('/', controller.getMug);

module.exports = router;
