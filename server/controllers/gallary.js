const Gallary = require('../models/gallary');
const { deleteImage } = require('../utils/helperFunctions');

module.exports.postGallary = (req, res, next) => {
    if(!req.user) {
        return;
    }

    if(!req.file) {
        return res.status(422).json({
            msg: ['Invalid Image']
        });
    }

    // Create new Entry in gallary
    const gallary = new Gallary({
        imageUrl: `/uploads/${req.file.filename}`,
        userId: req.user.id
    });

    gallary.save()
        .then(() => {
            res.status(201).json({
                msg: ['Image Successfully Added']
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports.getGallary = (req, res, next) => {
    if(!req.user) {
        return;
    }

    // Get Gallary
    Gallary.findAll({ where: { userId: req.user.id }, attributes: ['id', 'imageUrl', 'createdAt', 'updatedAt']})
        .then(gallary => {
            res.status(200).json({
                result: gallary
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports.deleteGallary = (req, res, next) => {
    
    const id = req.params.id;

    Gallary.findOne({ where: { userId: req.user.id, id: id } })
        .then(gallary => {
            if(!gallary) {
                return res.status(404).json({
                    msg: ['No Image Found']
                });
            }

            gallary.destroy()
            .then(() => {
                res.json({
                    msg: ['Image Deleted Successfully']
                });
                deleteImage(gallary.imageUrl);
                })
                .catch(error => {
                    next(error);
                });
            
        })
        .catch(error => {
            next(error);
        })
}