const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/desktopCalendar');

router.get('/category', controller.getDesktopCalendarCategory);

router.get('/', controller.getDesktopCalendar);

module.exports = router;
