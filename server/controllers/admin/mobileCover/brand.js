const MobileCoverBrand = require('../../../models/mobileCoverBrand');
const { validationResult } = require('express-validator/check');

// Add Mobile Cover Brand
module.exports.postMobileCoverBrand = (req, res, next) => {
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

    // Crate new Mobile Cover Brand
    const mobileCoverBrand = new MobileCoverBrand(userInput);

    mobileCoverBrand.save()
        .then(() => {
            res.json({
                msg : ['Mobile Cover Brand created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns Mug Categories
module.exports.getMobileCoverBrand = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Find All Mug Categories
    MobileCoverBrand.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Mobile Cover Brand
module.exports.deleteMobileCoverBrand = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find Mobile Cover Brand
    MobileCoverBrand.findByPk(id)
        .then(brand => {
            if(!brand) {
                return res.status(404).json({
                    msg: ['No Mobile Cover Brand Found']
                });
            }

            brand.destroy()
                .then(() => {
                    res.json({
                        msg: ['Mobile Cover Brand Deleted Successfully']
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

// Edit Mobile Cover Brand
module.exports.putMobileCoverBrand = (req, res, next) => {
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

    // Find Mobile Cover Brand
    MobileCoverBrand.findByPk(id)
        .then(brand => {
            if(!brand) {
                return res.status(404).json({
                    msg: ['No Mobile Cover Brand Found']
                });
            }

            brand.name = req.body.name;
            brand.save()
                .then(() => {
                    res.json({
                        msg: ['Mobile Cover Brand Edited Successfully']
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