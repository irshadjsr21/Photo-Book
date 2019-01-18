const PhotoBookCategory = require('../../../models/photoBookCategory');
const PhotoBook = require('../../../models/photoBook');
const { deleteImage, getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add PhotoBook Category
module.exports.postPhotoBook = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: `/uploads/${req.file.filename}`,
        photoBookCategoryId: req.body.photoBookCategoryId
    };

    const errors = getValidationResult(req);

    if (errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }

    PhotoBookCategory.findByPk(userInput.photoBookCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                throw getError(404, 'No Photo Book Category Found');
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

    const id = req.params.id;

    // Find PhotoBook
    PhotoBook.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                throw getError(404, 'No Photo Book Found');
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

    const id = req.params.id;

    const userInput = {
        name: req.body.name,
        price: req.body.price
    };

    if(req.file) {
        userInput.imageUrl = `/uploads/${req.file.filename}`;
    }

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find PhotoBook
    PhotoBook.findByPk(id)
        .then(photoBook => {
            if(!photoBook) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                throw getError(404, 'No Photo Book Found');
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