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