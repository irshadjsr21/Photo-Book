const User = require('../models/user');
const Address = require('../models/address');
const { signJwt, getError, getValidationResult } = require('../utils/helperFunctions');

module.exports.signUp = (req,res, next) => {

    const userInput = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Count The number of user with same email as req.body.email
    User.count({ where: { email: req.body.email } })
        .then(count => {

            // If one or more user is found with same email as req.body.email,
            // Show Error Message
            if(count > 0) {
                throw getError(422, 'Email Already Exists');
            } else {

                // If no user is found with the same email create new user
                const user = new User(userInput);

                // Save the new user into database
                user.save()
                    .then(() => {

                        // If user successfully created => Success msg.
                        res.status(201).json({
                            msg: ['User Successfully Signed Up']
                        });
                    })
                    .catch((error) => {

                        // If user cannot be created throw an error.
                        next(error);
                    });
            }
        })
        .catch((error) => {

            // If count users query cannot run, thorw an error.
            next(error);
        }); 
}

module.exports.login = (req, res, next) => {

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find User With Given Email
    User.findOne({ where : { email: req.body.email } })
        .then(user => {

            // Check If user Exists with the given Email
            if(user){

                // Check for the correct password
                user.checkPassword(req.body.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            // Sign JWT Token
                            signJwt(user.id, 'user', (error, token) => {
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
                            throw getError(422, 'Invalid Credentials');
                        }
                    })
                    .catch(error => {
                        next(error);
                    });
            } else {

                // If no user exists => error message
                throw getError(422, 'Invalid Credentials');
            }
        })
        .catch(error => {
            next(error);
        });
}

// Get User Profile
module.exports.getProfile = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Find User
    User.findByPk(req.user.id, { attributes: ['id', 'fullName', 'email', 'mobile', 'createdAt', 'updatedAt'] }) 
        .then(user => {
            if(!user) {
                throw getError(404, 'No User Found');
            }

            res.json({
                result: user
            });
        })
        .catch(error => {
            next(error);
        });
}


// Update User Profile
module.exports.putProfile = (req, res, next) => {

    if(!req.user) {
        return;
    }

    const userInput = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find User
    User.findByPk(req.user.id) 
        .then(user => {
            if(!user) {
                throw getError(404, 'No User Found');
            }

            for(const key in userInput) {
                user[key] = userInput[key];
            }

            user.save()
                .then(() => {
                    res.json({
                        msg: ['User Profile Edited Successfully']
                    });
                })
                .catch(error => {
                    next(error);
                });
        })
        .catch(error => {
            next(error);
        });
}

// Handles Change Password
module.exports.changePassword = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    let fetchedUser;

    // Find User
    User.findByPk(req.user.id, { attributes: ['id', 'password'] })
        .then(user => {
            fetchedUser = user;
            return user.checkPassword(req.body.password);
        })
        .then(isMatch => {
            if(isMatch) {
                fetchedUser.password = req.body.newPassword;
                fetchedUser.save()
                    .then(() => {
                        res.json({
                            msg: ['Password Changed Successfully']
                        });
                    })
                    .catch(error => {
                        next(error);
                    });
            } else {
                throw getError(422, 'Incorrect Password');
            }
        })
        .catch(error => {
            next(error);
        });
}



module.exports.getAddress = (req, res, next) => {

    if(!req.user) {
        return;
    }

    let fetchedUser;
    let fetchedDeliveryAddress;

    User.findByPk(req.user.id)
        .then(user => {
            if(!user) {
                throw getError(404, 'No User Found');
            }

            fetchedUser = user;

            return Address.findByPk(user.deliveryAddressId);
        })
        .then(deliveryAddress => {
            fetchedDeliveryAddress = deliveryAddress;

            return Address.findByPk(fetchedUser.billingAddressId);
        })
        .then(billingAddress => {
            res.json({
                result: {
                    deliveryAddress: fetchedDeliveryAddress,
                    billingAddress: billingAddress
                }
            });
        })
        .catch(error => {
            next(error);
        });
}

// Handles Saving Delivery Address
module.exports.postDeliveryAddress = (req, res, next) => {

    if(!req.user) {
        return;
    }

    const userInput = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    let fetchedUser;
    let isAddressNew = true;

    User.findByPk(req.user.id)
        .then(user => {
            if(!user) {
                throw getError(404, 'No User Found');
            }

            fetchedUser = user;

            if(user.deliveryAddressId) {
                isAddressNew = false;
                return Address.findByPk(user.deliveryAddressId);
            }

            // Create new Address
            const address = new Address(userInput);
        
            return address;
        })
        .then(address => {
            if(isAddressNew) {
                return address.save();
            } 

            for(const key in userInput) {
                address[key] = userInput[key];
            }

            return address.save();
        })
        .then(address => {
            if(isAddressNew) {
                fetchedUser.deliveryAddressId = address.id;
                return fetchedUser.save();
            }

            return Promise.resolve();
        })
        .then(() => {
            res.json({
                msg: ['Delivery Address Added Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}


// Handles Saving Billing Address
module.exports.postBillingAddress = (req, res, next) => {

    if(!req.user) {
        return;
    }

    const userInput = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    let fetchedUser;
    let isAddressNew = true;

    User.findByPk(req.user.id)
        .then(user => {
            if(!user) {
                throw getError(404, 'No User Found');
            }

            fetchedUser = user;

            if(user.billingAddressId) {
                isAddressNew = false;
                return Address.findByPk(user.billingAddressId);
            }

            // Create new Address
            const address = new Address(userInput);
        
            return address;
        })
        .then(address => {
            if(isAddressNew) {
                return address.save();
            } 

            for(const key in userInput) {
                address[key] = userInput[key];
            }

            return address.save();
        })
        .then(address => {
            if(isAddressNew) {
                fetchedUser.billingAddressId = address.id;
                return fetchedUser.save();
            }

            return Promise.resolve();
        })
        .then(() => {
            res.json({
                msg: ['Billing Address Added Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}