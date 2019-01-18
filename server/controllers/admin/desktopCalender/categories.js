const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const { getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add DesktopCalender Category
module.exports.postDesktopCalenderCategory = (req, res, next) => {

    const userInput = {
        name: req.body.name
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Crate new DesktopCalender Category
    const desktopCalenderCategory = new DesktopCalenderCategory(userInput);

    desktopCalenderCategory.save()
        .then(() => {
            res.json({
                msg : ['DesktopCalender Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns DesktopCalender Categories
module.exports.getDesktopCalenderCategory = (req, res, next) => {

    // Find All DesktopCalender Categories
    DesktopCalenderCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes DesktopCalender Category
module.exports.deleteDesktopCalenderCategory = (req, res, next) => {

    const id = req.params.id;

    // Find DesktopCalender Category
    DesktopCalenderCategory.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                throw getError(404, 'No DesktopCalender Category Found');
            }

            desktopCalender.destroy()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Category Deleted Successfully']
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

// Edit DesktopCalender Category
module.exports.putDesktopCalenderCategory = (req, res, next) => {
    
    const id = req.params.id;

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find DesktopCalender Category
    DesktopCalenderCategory.findByPk(id)
        .then(desktopCalender => {
            if(!desktopCalender) {
                throw getError(404, 'No DesktopCalender Category Found');
            }

            desktopCalender.name = req.body.name;
            desktopCalender.save()
                .then(() => {
                    res.json({
                        msg: ['DesktopCalender Category Edited Successfully']
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