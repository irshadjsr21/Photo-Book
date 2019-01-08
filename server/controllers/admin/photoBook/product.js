const PhotoBookCategory = require('../../../models/photoBookCategory');
const PhotoBook = require('../../../models/photoBook');
const { validationResult } = require('express-validator/check');
const { deleteImage } = require('../../../utils/helperFunctions');

// Add PhotoBook Category
module.exports.postPhotoBook = (req, res, next) => {
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
        photoBookCategoryId: req.body.photoBookCategoryId
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

    PhotoBookCategory.findByPk(userInput.photoBookCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                return res.status(404).json({
                    msg: ['No PhotoBook Category Found']
                });
            }
            
            // Crate new PhotoBook
            const photoBook = new PhotoBook(userInput);
        
            photoBook.save()
                .then(() => {
                    res.json({
                        msg : ['PhotoBook created Successfully']
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

// Returns PhotoBook
module.exports.getPhotoBook = (req, res, next) => {
    if(!req.user) {
        return;
    }
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.photoBookCategoryId = req.query.category;
    }

    // Find All PhotoBook Categories
    PhotoBook.findAll({ where: options })
        .then(photoBooks => {
            res.json({
                result: photoBooks
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes PhotoBook
module.exports.deletePhotoBook = (req, res, next) => {
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find PhotoBook
    PhotoBook.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                return res.status(404).json({
                    msg: ['No PhotoBook Found']
                });
            }

            photoBook.destroy()
                .then(() => {
                    deleteImage(photoBook.imageUrl);
                    res.json({
                        msg: ['PhotoBook Deleted Successfully']
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

// Edit PhotoBook
module.exports.putPhotoBook = (req, res, next) => {
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

    // Find PhotoBook
    PhotoBook.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                return res.status(404).json({
                    msg: ['No PhotoBook Found']
                });
            }

            if(userInput.imageUrl) {
                deleteImage(photoBook.imageUrl);
            }

            for(const key in userInput) {
                photoBook[key] = userInput[key];
            }
            
            photoBook.save()
                .then(() => {
                    res.json({
                        msg: ['PhotoBook Edited Successfully']
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