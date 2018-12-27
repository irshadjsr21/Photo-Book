const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const adminAuthRouter = require('./admin/auth');

router.use(authRouter);
router.use('/admin', adminAuthRouter);

module.exports = router;