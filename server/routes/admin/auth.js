const express = require('express');
const router = express.Router();

const authController = require('../../controllers/admin/auth');
const validator = require('../../middlewares/validator');

router.post('/login', validator.userLogin, authController.login);

module.exports = router;