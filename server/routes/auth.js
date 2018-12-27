const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const validator = require('../middlewares/validator');

router.post('/signup', validator.userSignUp, authController.signUp);

router.post('/login', validator.userLogin, authController.login);

module.exports = router;