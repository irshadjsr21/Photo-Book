const MugCategory = require('../../../models/mugCategory');
const Mug = require('../../../models/mug');
const { validationResult } = require('express-validator/check');

// Add Mug Category
module.exports.postMug = (req, res, next) => {

    if(!req.file) {
        return res.status(422).json({
            msg: ['Image Is required']
        });
    }

    const userInput = {
        name: req.body.name,
        whitePrice: req.body.whitePrice,
        blackPrice: req.body.blackPrice,
        imageUrl: `/uploads/${req.file.filename}`,
        mugCategoryId: req.body.mugCategoryId
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

    MugCategory.findByPk(userInput.mugCategoryId)
        .then(category => {
            if(!category) {
                return res.status(404).json({
                    msg: ['No Mug Category Found']
                });
            }
            
            // Crate new Mug
            const mug = new Mug(userInput);
        
            mug.save()
                .then(() => {
                    res.json({
                        msg : ['Mug created Successfully']
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

// Returns Mug
module.exports.getMug = (req, res, next) => {

    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.mugCategoryId = req.query.category;
    }

    // Find All Mug Categories
    Mug.findAll({ where: options })
        .then(mugs => {
            res.json({
                result: mugs
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Mug
module.exports.deleteMug = (req, res, next) => {

    const id = req.params.id;

    // Find Mug
    Mug.findByPk(id)
        .then(mug => {
            if(!mug) {
                return res.status(404).json({
                    msg: ['No Mug Found']
                });
            }

            mug.destroy()
                .then(() => {
                    res.json({
                        msg: ['Mug Deleted Successfully']
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

// Edit Mug
module.exports.putMug = (req, res, next) => {
    
    const id = req.params.id;

    const userInput = {
        name: req.body.name,
        whitePrice: req.body.whitePrice,
        blackPrice: req.body.blackPrice,
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

    // Find Mug
    Mug.findByPk(id)
        .then(mug => {
            if(!mug) {
                return res.status(404).json({
                    msg: ['No Mug Found']
                });
            }

            for(const key in userInput) {
                mug[key] = userInput[key];
            }
            
            mug.save()
                .then(() => {
                    res.json({
                        msg: ['Mug Edited Successfully']
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