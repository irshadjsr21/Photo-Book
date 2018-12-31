const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const { validationResult } = require('express-validator/check');

// Add DesktopCalender Category
module.exports.postDesktopCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const userInput = {
        name: req.body.name
    };

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists => Show Error Message
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).json({
            msg: errors
        });
    }

    // Crate new DesktopCalender Category
    const desktopCalenderCategory = new DesktopCalenderCategory(userInput);

    desktopCalenderCategory.save()
        .then(() => {
            res.json({
                msg : ['DesktopCalender Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns DesktopCalender Categories
module.exports.getDesktopCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Find All DesktopCalender Categories
    DesktopCalenderCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes DesktopCalender Category
module.exports.deleteDesktopCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find DesktopCalender Category
    DesktopCalenderCategory.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                return res.status(404).json({
                    msg: ['No DesktopCalender Category Found']
                });
            }

            desktopCalender.destroy()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Category Deleted Successfully']
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

// Edit DesktopCalender Category
module.exports.putDesktopCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const id = req.params.id;

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists => Show Error Message
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).json({
            msg: errors
        });
    }

    // Find DesktopCalender Category
    DesktopCalenderCategory.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                return res.status(404).json({
                    msg: ['No DesktopCalender Category Found']
                });
            }

            desktopCalender.name = req.body.name;
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Category Edited Successfully']
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