const MugCategory = require('../../../models/mugCategory');
const { getError, getValidationResult } = require('../../../utils/helperFunctions');

// Add Mug Category
module.exports.postMugCategory = (req, res, next) => {
    
    const userInput = {
        name: req.body.name
    };

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Crate new Mug Category
    const mugCategory = new MugCategory(userInput);

    mugCategory.save()
        .then(() => {
            res.json({
                msg : ['Mug Category created Successfully']
            });
        })
        .catch(error => {
            next(error);
        });
}

// Returns Mug Categories
module.exports.getMugCategory = (req, res, next) => {

    // Find All Mug Categories
    MugCategory.findAll()
        .then(category => {
            res.json({
                result: category
            });
        })
        .catch(error => {
            next(error);
        });
}

// Deletes Mug Category
module.exports.deleteMugCategory = (req, res, next) => {

    const id = req.params.id;

    // Find Mug Category
    MugCategory.findByPk(id)
        .then(mug => {
            if(!mug) {
                throw getError(404, 'No Mug Category Found');

            }

            mug.destroy()
                .then(() => {
                    res.json({
                        msg: ['Mug Category Deleted Successfully']
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

// Edit Mug Category
module.exports.putMugCategory = (req, res, next) => {
    
    const id = req.params.id;

    const errors = getValidationResult(req);

    if (errors) {
        throw getError(422, 'Invalid Input', errors);
    }

    // Find Mug Category
    MugCategory.findByPk(id)
        .then(mug => {
            if(!mug) {
                throw getError(404, 'No Mug Category Found');
            }

            mug.name = req.body.name;
            mug.save()
                .then(() => {
                    res.json({
                        msg: ['Mug Category Edited Successfully']
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