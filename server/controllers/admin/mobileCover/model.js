const MobileCoverBrand = require('../../../models/mobileCoverBrand');
const MobileCoverModel = require('../../../models/mobileCoverModel');
const { getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add MobileCoverModel Category
module.exports.postMobileCoverModel = (req, res, next) => {

    const userInput = {
        name: req.body.name,
        mobileCoverBrandId: req.body.mobileCoverBrandId
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    MobileCoverBrand.findByPk(userInput.mobileCoverBrandId)
        .then(category => {
            if(!category) {
                throw getError(404, 'No Mobile Cover Brand Found');
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

    const id = req.params.id;

    // Find MobileCoverModel
    MobileCoverModel.findByPk(id)
        .then(mobileCoverModel => {
            if(!mobileCoverModel) {
                throw getError(404, 'No Mobile Cover Model Found');
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
    
    const id = req.params.id;

    const userInput = {
        name: req.body.name,
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find MobileCoverModel
    MobileCoverModel.findByPk(id)
        .then(mobileCoverModel => {
            if(!mobileCoverModel) {
                throw getError(404, 'No Mobile Cover Model Found');
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