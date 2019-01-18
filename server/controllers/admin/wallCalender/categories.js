const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const { getError, getValidationResult } = require('../../../utils/helperFunctions');


// Add Wall Calender Category
module.exports.postWallCalenderCategory = (req, res, next) => {
    
    const userInput = {
        name: req.body.name
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Crate new Wall Calender Category
    const wallCalenderCategory = new WallCalenderCategory(userInput);

    wallCalenderCategory.save()
        .then(() => {
            res.json({
                msg : ['Wall Calender Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns Wall Calender Categories
module.exports.getWallCalenderCategory = (req, res, next) => {

    // Find All Wall Calender Categories
    WallCalenderCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Wall Calender Category
module.exports.deleteWallCalenderCategory = (req, res, next) => {

    const id = req.params.id;

    // Find Wall Calender Category
    WallCalenderCategory.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                return res.status(404).json({
                    msg: ['No Wall Calender Category Found']
                });
            }

            wallCalender.destroy()
                .then(() => {
                    res.json({
                        msg: ['Wall Calender Category Deleted Successfully']
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

// Edit Wall Calender Category
module.exports.putWallCalenderCategory = (req, res, next) => {
    
    const id = req.params.id;

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find Wall Calender Category
    WallCalenderCategory.findByPk(id)
        .then(wallCalender => {
            if(!wallCalender) {
                throw getError(404, 'No Wall Calender Category Found');

            }

            wallCalender.name = req.body.name;
            wallCalender.save()
                .then(() => {
                    res.json({
                        msg: ['Wall Calender Category Edited Successfully']
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