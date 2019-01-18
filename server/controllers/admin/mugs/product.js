const MugCategory = require('../../../models/mugCategory');
const Mug = require('../../../models/mug');
const { deleteImage, getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add Mug Category
module.exports.postMug = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        name: req.body.name,
        whitePrice: req.body.whitePrice,
        blackPrice: req.body.blackPrice,
        imageUrl: `/uploads/${req.file.filename}`,
        mugCategoryId: req.body.mugCategoryId
    };

    const errors = getValidationResult(req);

    if (errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }

    MugCategory.findByPk(userInput.mugCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                throw getError(404, 'No Mug Category Found');
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
                throw getError(404, 'No Mug Category Found');
            }

            mug.destroy()
                .then(() => {
                    deleteImage(mug.imageUrl);
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

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find Mug
    Mug.findByPk(id)
        .then(mug => {
            if(!mug) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                throw getError(404, 'No Mug Found');
            }

            if(userInput.imageUrl) {
                deleteImage(mug.imageUrl);
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