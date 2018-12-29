const MugCategory = require('../../../models/mugCategory');
const { validationResult } = require('express-validator/check');

// Add Mug Category
module.exports.postMugCategory = (req, res, next) => {
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
    if(!req.user) {
        return;
    }

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
    if(!req.user) {
        return;
    }

    const id = req.params.id;

    // Find Mug Category
    MugCategory.findByPk(id)
        .then(mug => {
            if(!mug) {
                return res.status(404).json({
                    msg: ['No Mug Category Found']
                });
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

    // Find Mug Category
    MugCategory.findByPk(id)
        .then(mug => {
            if(!mug) {
                return res.status(404).json({
                    msg: ['No Mug Category Found']
                });
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