const MobileCoverBrand = require('../../../models/mobileCoverBrand');
const { getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add Mobile Cover Brand
module.exports.postMobileCoverBrand = (req, res, next) => {
    
    const userInput = {
        name: req.body.name
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
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

    const id = req.params.id;

    // Find Mobile Cover Brand
    MobileCoverBrand.findByPk(id)
        .then(brand => {
            if(!brand) {
                throw getError(404, 'No Mobile Cover Brand Found');
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
    
    const id = req.params.id;

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find Mobile Cover Brand
    MobileCoverBrand.findByPk(id)
        .then(brand => {
            if(!brand) {
                throw getError(404, 'No Mobile Cover Brand Found');
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