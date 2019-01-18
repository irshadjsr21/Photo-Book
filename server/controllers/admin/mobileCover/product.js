const MobileCoverModel = require('../../../models/mobileCoverModel');
const MobileCover = require('../../../models/mobileCover');
const { deleteImage, getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add MobileCover Category
module.exports.postMobileCover = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');

    }

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: `/uploads/${req.file.filename}`,
        mobileCoverModelId: req.body.mobileCoverModelId
    };

    const errors = getValidationResult(req);

    if (errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }

    MobileCoverModel.findByPk(userInput.mobileCoverModelId)
        .then(model => {
            if(!model) {
                deleteImage(userInput.imageUrl);
                throw getError(404, 'No Mobile Cover Model Found');
            }
            
            // Crate new MobileCover
            const mobileCover = new MobileCover(userInput);
        
            mobileCover.save()
                .then(() => {
                    res.json({
                        msg : ['Mobile Cover created Successfully']
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

// Returns MobileCover
module.exports.getMobileCover = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.mobileCoverModelId = req.query.model;
    }

    // Find All MobileCover Categories
    MobileCover.findAll({ where: options })
        .then(mobileCovers => {
            res.json({
                result: mobileCovers
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes MobileCover
module.exports.deleteMobileCover = (req, res, next) => {

    const id = req.params.id;

    // Find MobileCover
    MobileCover.findByPk(id)
        .then(mobileCover => {
            if(!mobileCover) {
                throw getError(404, 'No Mobile Cover Found');
            }

            mobileCover.destroy()
                .then(() => {
                    deleteImage(mobileCover.imageUrl);
                    res.json({
                        msg: ['MobileCover Deleted Successfully']
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

// Edit MobileCover
module.exports.putMobileCover = (req, res, next) => {
    
    const id = req.params.id;

    const userInput = {
        name: req.body.name,
        price: req.body.price,
    };

    if(req.file) {
        userInput.imageUrl = `/uploads/${req.file.filename}`;
    }

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find MobileCover
    MobileCover.findByPk(id)
        .then(mobileCover => {
            if(!mobileCover) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                throw getError(404, 'No Mobile Cover Found');
            }

            if(userInput.imageUrl) {
                deleteImage(mobileCover.imageUrl);
            }

            for(const key in userInput) {
                mobileCover[key] = userInput[key];
            }
            
            mobileCover.save()
                .then(() => {
                    res.json({
                        msg: ['MobileCover Edited Successfully']
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