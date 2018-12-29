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
        .isLength({min : 5})
        .withMessage('Password is too Short'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if(value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
]

module.exports.userLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is Required')
]

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
]

module.exports.changePassword = [
    body('newPassword')
        .isLength({min : 5})
        .withMessage('Password is too Short'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if(value !== req.body.newPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
]

module.exports.mugCategory = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is Required')
]

module.exports.mug = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is Required'),
    body('whitePrice')
        .not()
        .isEmpty()
        .withMessage('Price is Required'),
    body('blackPrice')
        .not()
        .isEmpty()
        .withMessage('Price is Required')
]