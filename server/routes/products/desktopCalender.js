const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/desktopCalender');

router.get('/category', controller.getDesktopCalenderCategory);

router.get('/', controller.getDesktopCalender);

module.exports = router;
