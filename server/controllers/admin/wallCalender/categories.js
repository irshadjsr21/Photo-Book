const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const { validationResult } = require('express-validator/check');

// Add Wall Calender Category
module.exports.postWallCalenderCategory = (req, res, next) => {
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

    // Crate new Wall Calender Category
    const wallCalenderCategory = new WallCalenderCategory(userInput);

    wallCalenderCategory.save()
        .then(() => {
            res.json({
                msg : ['Wall Calender Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns Wall Calender Categories
module.exports.getWallCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Find All Wall Calender Categories
    WallCalenderCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Wall Calender Category
module.exports.deleteWallCalenderCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find Wall Calender Category
    WallCalenderCategory.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                return res.status(404).json({
                    msg: ['No Wall Calender Category Found']
                });
            }

            wallCalender.destroy()
                .then(() => {
                    res.json({
                        msg: ['Wall Calender Category Deleted Successfully']
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

// Edit Wall Calender Category
module.exports.putWallCalenderCategory = (req, res, next) => {
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

    // Find Wall Calender Category
    WallCalenderCategory.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                return res.status(404).json({
                    msg: ['No Wall Calender Category Found']
                });
            }

            wallCalender.name = req.body.name;
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg: ['Wall Calender Category Edited Successfully']
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