const { body } = require('express-validator/check');

module.exports.userSignUp = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full Name is Required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password is too Short'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

module.exports.userLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is Required')
];

module.exports.userProfile = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full Name is Required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('mobile', 'Invalid Mobile Number')
    .isNumeric()
    .isLength({ min: 10, max: 10 })
];

module.exports.changePassword = [
  body('newPassword')
    .isLength({ min: 5 })
    .withMessage('Password is too Short'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

module.exports.address = [
  body('name', 'Name is Required')
    .not()
    .isEmpty(),
  body('address1', 'Address 1 is Required')
    .not()
    .isEmpty(),
  body('address2', 'Address 2 is Required')
    .not()
    .isEmpty(),
  body('city', 'City is Required')
    .not()
    .isEmpty(),
  body('state', 'State is Required')
    .not()
    .isEmpty(),
  body('pincode', 'Pincode is Invalid')
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 6, max: 6 })
];

// ******************************
// ********** Carts *************
// ******************************

module.exports.postMugCart = [
  body('mugId')
    .not()
    .isEmpty()
    .withMessage('Mug Id is Required'),
  body('colour')
    .isIn(['white', 'black'])
    .withMessage('Invalid Colour')
];

module.exports.putMugCart = [
  body('colour')
    .optional()
    .isIn(['white', 'black'])
    .withMessage('Invalid Colour'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Quantity')
];

module.exports.postPhotoBookCart = [
  body('photoBookId')
    .not()
    .isEmpty()
    .withMessage('Photo Book Id is Required')
];

module.exports.putPhotoBookCart = [
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Invalid Quantity')
];
