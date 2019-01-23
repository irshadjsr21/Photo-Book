const { body } = require('express-validator/check');

module.exports.adminProfile = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full Name is Required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email')
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

// ***************************************************
// ************** Products Validator *****************
// ***************************************************

// ****** Mugs *******
module.exports.mugCategory = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.postMug = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body('whitePrice')
    .isNumeric()
    .withMessage('Invalid White Price'),
  body('blackPrice')
    .isNumeric()
    .withMessage('Invalid Black Price'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('whiteOfferPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid White Offer Price'),
  body('blackOfferPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Black Offer Price')
];

module.exports.putMug = [
  body('name').escape(),
  body('whitePrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid White Price'),
  body('blackPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Black Price'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('whiteOfferPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid White Offer Price'),
  body('blackOfferPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Black Offer Price')
];

// ******* Desktop Calender **********
module.exports.desktopCalenderCategory = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.postDesktopCalender = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body('price')
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

module.exports.putDesktopCalender = [
  body('name').escape(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

// ********** Wall Calender *********
module.exports.wallCalenderCategory = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.postWallCalender = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body('price')
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

module.exports.putWallCalender = [
  body('name').escape(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

// ******** Photo Book ***********
module.exports.photoBookCategory = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.postPhotoBook = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body('price')
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

module.exports.putPhotoBook = [
  body('name').escape(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

// ******* Mobile Cover *********
module.exports.mobileCoverBrand = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.mobileCoverModel = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required')
];

module.exports.postMobileCover = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body('price')
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];

module.exports.putMobileCover = [
  body('name').escape(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Invalid Price'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Invalid Stock'),
  body('offerPrice')
    .optional()
    .isNumeric()
    .withMessage('Invalid Offer Price')
];
