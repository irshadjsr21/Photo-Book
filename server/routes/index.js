const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/authenticator');

const authRouter = require('./auth');
const adminAuthRouter = require('./admin/auth');
const mugCategoryRouter = require('./admin/mugs/categories');
const mugRouter = require('./admin/mugs/product');

router.use(authRouter);
router.use('/admin', adminAuthRouter);
router.use('/admin/mugs/category', authenticator('admin'), mugCategoryRouter);
router.use('/admin/mugs', authenticator('admin'), mugRouter);

module.exports = router;