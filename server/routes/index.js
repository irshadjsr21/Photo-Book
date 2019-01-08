const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/authenticator');

const authRouter = require('./auth');
const adminAuthRouter = require('./admin/auth');
const mugCategoryRouter = require('./admin/mugs/categories');
const mugRouter = require('./admin/mugs/product');
const desktopCalenderCategoryRouter = require('./admin/desktopCalender/categories');
const desktopCalenderRouter = require('./admin/desktopCalender/product');
const wallCalenderCategoryRouter = require('./admin/wallCalender/categories');
const wallCalenderRouter = require('./admin/wallCalender/product');
const photoBookCategoryRouter = require('./admin/photoBook/categories');
const photoBookRouter = require('./admin/photoBook/product');
const gallaryRouter = require('./gallary');

router.use(authRouter);
router.use('/admin', adminAuthRouter);
router.use('/admin/mugs/category', authenticator('admin'), mugCategoryRouter);
router.use('/admin/mugs', authenticator('admin'), mugRouter);
router.use('/admin/desktop-calender/category', authenticator('admin'), desktopCalenderCategoryRouter);
router.use('/admin/desktop-calender', authenticator('admin'), desktopCalenderRouter);
router.use('/admin/wall-calender/category', authenticator('admin'), wallCalenderCategoryRouter);
router.use('/admin/wall-calender', authenticator('admin'), wallCalenderRouter);
router.use('/admin/photo-book/category', authenticator('admin'), photoBookCategoryRouter);
router.use('/admin/photo-book', authenticator('admin'), photoBookRouter);
router.use('/gallary', authenticator(), gallaryRouter);

module.exports = router;