const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/wallCalendar');

router.get('/category', controller.getWallCalendarCategory);

router.get('/', controller.getWallCalendar);

module.exports = router;
