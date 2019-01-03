const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const DesktopCalender = require('../../../models/desktopCalender');
const { validationResult } = require('express-validator/check');
const { deleteImage } = require('../../../utils/helperFunctions');

// Add DesktopCalender Category
module.exports.postDesktopCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }

    if(!req.file) {
        return res.status(422).json({
            msg: ['Image Is required']
        });
    }

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: `/uploads/${req.file.filename}`,
        desktopCalenderCategoryId: req.body.desktopCalenderCategoryId
    };

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists => Show Error Message
    if(validationError.length > 0) {
        deleteImage(userInput.imageUrl);
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).json({
            msg: errors
        });
    }

    DesktopCalenderCategory.findByPk(userInput.desktopCalenderCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                return res.status(404).json({
                    msg: ['No DesktopCalender Category Found']
                });
            }
            
            // Crate new DesktopCalender
            const desktopCalender = new DesktopCalender(userInput);
        
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg : ['DesktopCalender created Successfully']
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

// Returns DesktopCalender
module.exports.getDesktopCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.desktopCalenderCategoryId = req.query.category;
    }

    // Find All DesktopCalender Categories
    DesktopCalender.findAll({ where: options })
        .then(desktopCalenders => {
            res.json({
                result: desktopCalenders
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes DesktopCalender
module.exports.deleteDesktopCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find DesktopCalender
    DesktopCalender.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                return res.status(404).json({
                    msg: ['No DesktopCalender Found']
                });
            }

            desktopCalender.destroy()
                .then(() => {
                    deleteImage(desktopCalender.imageUrl);
                    res.json({
                        msg: ['DesktopCalender Deleted Successfully']
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

// Edit DesktopCalender
module.exports.putDesktopCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    const userInput = {
        name: req.body.name,
        price: req.body.price
    };

    if(req.file) {
        userInput.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists => Show Error Message
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).json({
            msg: errors
        });
    }

    // Find DesktopCalender
    DesktopCalender.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                return res.status(404).json({
                    msg: ['No DesktopCalender Found']
                });
            }

            deleteImage(desktopCalender.imageUrl);

            for(const key in userInput) {
                desktopCalender[key] = userInput[key];
            }
            
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Edited Successfully']
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