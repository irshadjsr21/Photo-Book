const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const WallCalender = require('../../../models/wallCalender');
const { validationResult } = require('express-validator/check');
const { deleteImage } = require('../../../utils/helperFunctions');

// Add WallCalender Category
module.exports.postWallCalender = (req, res, next) => {
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
        wallCalenderCategoryId: req.body.wallCalenderCategoryId
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

    WallCalenderCategory.findByPk(userInput.wallCalenderCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                return res.status(404).json({
                    msg: ['No WallCalender Category Found']
                });
            }
            
            // Crate new WallCalender
            const wallCalender = new WallCalender(userInput);
        
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg : ['WallCalender created Successfully']
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

// Returns WallCalender
module.exports.getWallCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.wallCalenderCategoryId = req.query.category;
    }

    // Find All WallCalender Categories
    WallCalender.findAll({ where: options })
        .then(wallCalenders => {
            res.json({
                result: wallCalenders
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes WallCalender
module.exports.deleteWallCalender = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find WallCalender
    WallCalender.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                return res.status(404).json({
                    msg: ['No WallCalender Found']
                });
            }

            wallCalender.destroy()
                .then(() => {
                    deleteImage(wallCalender.imageUrl);
                    res.json({
                        msg: ['WallCalender Deleted Successfully']
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

// Edit WallCalender
module.exports.putWallCalender = (req, res, next) => {
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

    // Find WallCalender
    WallCalender.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                return res.status(404).json({
                    msg: ['No WallCalender Found']
                });
            }

            deleteImage(wallCalender.imageUrl);

            for(const key in userInput) {
                wallCalender[key] = userInput[key];
            }
            
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg: ['WallCalender Edited Successfully']
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