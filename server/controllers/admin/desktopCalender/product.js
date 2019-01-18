const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const DesktopCalender = require('../../../models/desktopCalender');
const { deleteImage, getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add DesktopCalender Category
module.exports.postDesktopCalender = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: `/uploads/${req.file.filename}`,
        desktopCalenderCategoryId: req.body.desktopCalenderCategoryId
    };

    const errors = getValidationResult(req);

    if (errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }

    DesktopCalenderCategory.findByPk(userInput.desktopCalenderCategoryId)
        .then(category => {
            if(!category) {
                deleteImage(userInput.imageUrl);
                throw getError(404, 'No DesktopCalender Category Found');
            }
            
            // Crate new DesktopCalender
            const desktopCalender = new DesktopCalender(userInput);
        
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg : ['DesktopCalender created Successfully']
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

// Returns DesktopCalender
module.exports.getDesktopCalender = (req, res, next) => {
    
    const options = {}; 
    if(req.query.id) {
        options.id = req.query.id;
    } else if (req.query.category) {
        options.desktopCalenderCategoryId = req.query.category;
    }

    // Find All DesktopCalender Categories
    DesktopCalender.findAll({ where: options })
        .then(desktopCalenders => {
            res.json({
                result: desktopCalenders
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes DesktopCalender
module.exports.deleteDesktopCalender = (req, res, next) => {

    const id = req.params.id;

    // Find DesktopCalender
    DesktopCalender.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                throw getError(404, 'No DesktopCalender Found');
            }

            desktopCalender.destroy()
                .then(() => {
                    deleteImage(desktopCalender.imageUrl);
                    res.json({
                        msg: ['DesktopCalender Deleted Successfully']
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

// Edit DesktopCalender
module.exports.putDesktopCalender = (req, res, next) => {

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

    // Find DesktopCalender
    DesktopCalender.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                if(userInput.imageUrl) {
                    deleteImage(userInput.imageUrl);
                }
                throw getError(404, 'No DesktopCalender Found');
            }

            if(userInput.imageUrl) {
                deleteImage(desktopCalender.imageUrl);
            }

            for(const key in userInput) {
                desktopCalender[key] = userInput[key];
            }
            
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Edited Successfully']
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