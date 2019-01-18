const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const WallCalender = require('../../../models/wallCalender');
const { deleteImage, getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add WallCalender Category
module.exports.postWallCalender = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: `/uploads/${req.file.filename}`,
        wallCalenderCategoryId: req.body.wallCalenderCategoryId
    };

    const errors = getValidationResult(req);

    if (errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }

    WallCalenderCategory.findByPk(userInput.wallCalenderCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                throw getError(404, 'No Wall Calender Category Found');
            }
            
            // Crate new WallCalender
            const wallCalender = new WallCalender(userInput);
        
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg : ['WallCalender created Successfully']
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

// Returns WallCalender
module.exports.getWallCalender = (req, res, next) => {
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.wallCalenderCategoryId = req.query.category;
    }

    // Find All WallCalender Categories
    WallCalender.findAll({ where: options })
        .then(wallCalenders => {
            res.json({
                result: wallCalenders
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes WallCalender
module.exports.deleteWallCalender = (req, res, next) => {

    const id = req.params.id;

    // Find WallCalender
    WallCalender.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                throw getError(404, 'No Wall Calender Found');
            }

            wallCalender.destroy()
                .then(() => {
                    deleteImage(wallCalender.imageUrl);
                    res.json({
                        msg: ['WallCalender Deleted Successfully']
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

// Edit WallCalender
module.exports.putWallCalender = (req, res, next) => {
    
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

    // Find WallCalender
    WallCalender.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                throw getError(404, 'No Wall Calender Found');
            }

            deleteImage(wallCalender.imageUrl);

            for(const key in userInput) {
                wallCalender[key] = userInput[key];
            }
            
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg: ['WallCalender Edited Successfully']
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