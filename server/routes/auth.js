const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const validator = require('../middlewares/validator');
const authenticator = require('../middlewares/authenticator');

router.post('/signup', validator.userSignUp, authController.signUp);

router.post('/login', validator.userLogin, authController.login);

router.get('/profile', authenticator(), authController.getProfile);

router.put('/profile', authenticator(), validator.userProfile, authController.putProfile);

router.post('/change-password', authenticator(), validator.changePassword, authController.changePassword);

router.get('/address', authenticator(), authController.getAddress);

router.post('/delivery-address', authenticator(), validator.address, authController.postDeliveryAddress);

router.post('/billing-address', authenticator(), validator.address, authController.postBillingAddress);

module.exports = router;