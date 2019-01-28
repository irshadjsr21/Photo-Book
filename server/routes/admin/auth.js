const express = require('express');
const router = express.Router();

const authController = require('../../controllers/admin/auth');
const validator = require('../../middlewares/adminValidator');
const authenticator = require('../../middlewares/authenticator');

router.post('/login', validator.userLogin, authController.login);

router.get('/profile', authenticator('admin'), authController.getProfile);

router.put(
  '/profile',
  authenticator('admin'),
  validator.adminProfile,
  authController.putProfile
);

router.post(
  '/change-password',
  authenticator('admin'),
  validator.changePassword,
  authController.changePassword
);

module.exports = router;
