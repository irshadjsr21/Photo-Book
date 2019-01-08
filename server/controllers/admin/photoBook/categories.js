const PhotoBookCategory = require('../../../models/photoBookCategory');
const { validationResult } = require('express-validator/check');

// Add Photo Book Category
module.exports.postPhotoBookCategory = (req, res, next) => {
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

    // Crate new Photo Book Category
    const photoBookCategory = new PhotoBookCategory(userInput);

    photoBookCategory.save()
        .then(() => {
            res.json({
                msg : ['Photo Book Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns Photo Book Categories
module.exports.getPhotoBookCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Find All Photo Book Categories
    PhotoBookCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Photo Book Category
module.exports.deletePhotoBookCategory = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find Photo Book Category
    PhotoBookCategory.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                return res.status(404).json({
                    msg: ['No Photo Book Category Found']
                });
            }

            photoBook.destroy()
                .then(() => {
                    res.json({
                        msg: ['Photo Book Category Deleted Successfully']
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

// Edit Photo Book Category
module.exports.putPhotoBookCategory = (req, res, next) => {
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

    // Find Photo Book Category
    PhotoBookCategory.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                return res.status(404).json({
                    msg: ['No Photo Book Category Found']
                });
            }

            photoBook.name = req.body.name;
            photoBook.save()
                .then(() => {
                    res.json({
                        msg: ['Photo Book Category Edited Successfully']
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