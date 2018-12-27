const Admin = require('../../models/admin');
const { validationResult } = require('express-validator/check');
const { signJwt } = require('../../utils/helperFunctions');

// Handles Admin Login
module.exports.login = (req, res, next) => {

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists => Show Error Message
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).json({
            msg: errors
        });
    }

    // Find User With Given Email
    Admin.findOne({ where : { email: req.body.email } })
        .then(admin => {

            // Check If user Exists with the given Email
            if(admin){

                // Check for the correct password
                admin.checkPassword(req.body.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            // Sign JWT Token
                            signJwt(admin.id, 'admin', (error, token) => {
                                if(error){
                                    return next(error);
                                }
                                else {
                                    return res.status(200).json({
                                        msg: [
                                            "Logged In Successfully"
                                        ],
                                        token: token
                                    });
                                }
                            });    
                        } else {
                            let errors = ['Invalid Credentials'];
                            return res.status(422).json({
                                msg: errors
                            });
                        }
                    })
                    .catch(error => {
                        next(error);
                    });
            } else {

                // If no user exists => error message
                let errors = ['Invalid Credentials'];
                return res.status(422).json({
                    msg: errors
                });
            }
        })
        .catch(error => {
            next(error);
        });
}