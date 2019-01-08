const MobileCoverBrand = require('../../../models/mobileCoverBrand');
const MobileCoverModel = require('../../../models/mobileCoverModel');
const { validationResult } = require('express-validator/check');

// Add MobileCoverModel Category
module.exports.postMobileCoverModel = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const userInput = {
        name: req.body.name,
        mobileCoverBrandId: req.body.mobileCoverBrandId
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

    MobileCoverBrand.findByPk(userInput.mobileCoverBrandId)
        .then(category => {
            if(!category) {
                return res.status(404).json({
                    msg: ['No Mobile Cover Brand Found']
                });
            }
            
            // Crate new MobileCoverModel
            const mobileCoverModel = new MobileCoverModel(userInput);
        
            mobileCoverModel.save()
                .then(() => {
                    res.json({
                        msg : ['Mobile Cover Model created Successfully']
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

// Returns MobileCoverModel
module.exports.getMobileCoverModel = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.brand) {
        options.mobileCoverBrandId = req.query.brand;
    }

    // Find All MobileCoverModel Categories
    MobileCoverModel.findAll({ where: options })
        .then(mobileCoverModels => {
            res.json({
                result: mobileCoverModels
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes MobileCoverModel
module.exports.deleteMobileCoverModel = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find MobileCoverModel
    MobileCoverModel.findByPk(id)
        .then(mobileCoverModel => {
            if(!mobileCoverModel) {
                return res.status(404).json({
                    msg: ['No MobileCoverModel Found']
                });
            }

            mobileCoverModel.destroy()
                .then(() => {
                    res.json({
                        msg: ['MobileCoverModel Deleted Successfully']
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

// Edit MobileCoverModel
module.exports.putMobileCoverModel = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const id = req.params.id;

    const userInput = {
        name: req.body.name,
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

    // Find MobileCoverModel
    MobileCoverModel.findByPk(id)
        .then(mobileCoverModel => {
            if(!mobileCoverModel) {
                return res.status(404).json({
                    msg: ['No MobileCoverModel Found']
                });
            }

            for(const key in userInput) {
                mobileCoverModel[key] = userInput[key];
            }
            
            mobileCoverModel.save()
                .then(() => {
                    res.json({
                        msg: ['MobileCoverModel Edited Successfully']
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