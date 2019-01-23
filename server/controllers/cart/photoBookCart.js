const PhotoBookCart = require('../../models/photoBookCart');
const PhotoBook = require('../../models/photoBook');
const Cart = require('../../models/cart');
const PhotoBookCartItem = require('../../models/photoBookCartItem')
const { getError, getValidationResult, deleteImage } = require('../../utils/helperFunctions');
const { mapPhotoBookCartItems, mapPhotoBookCartItem } = require('../../utils/map');
const { addPhotoBooksThroughId, addPhotoBookThroughId , getPhotoBookCartId } = require('../../utils/modelHelpers');


module.exports.postPhotoBookItem = (req, res, next) => {
    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        photoBookId: req.body.photoBookId,
        quantity: req.body.quantity || 1,
        imageUrl: `/uploads/${req.file.filename}`
    }

    let fetchedCart;

    const errors = getValidationResult(req);

    if(errors) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Invalid Input', errors);
    }


    Cart.findOrCreate({ where: {userId: req.user.id }})
        .then(cart => {
            return PhotoBookCart.findOrCreate({where : { cartId: cart[0].id }});
        })
        .then(photoBookCarts => {
            const photoBookCart = photoBookCarts[0];
            fetchedCart = photoBookCart;
            return fetchedCart.getPhotoBooks({ where: { id: userInput.photoBookId } });
        })
        .then(photoBooks => {
            if(photoBooks.length > 0) {
                deleteImage(userInput.imageUrl);
                throw getError(422, 'Item Already Exists');
            }
            return PhotoBook.findByPk(userInput.photoBookId);
        })
        .then(photoBook => {
            if(!photoBook) {
                deleteImage(userInput.imageUrl);                
                throw getError(404, 'No PhotoBook Found');
            }
            return fetchedCart.addPhotoBook(photoBook, { through: {quantity: userInput.quantity, imageUrl: userInput.imageUrl} });
        })
        .then(() => {
            return PhotoBookCartItem.findOne({ where: { photoBookCartId: fetchedCart.id, photoBookId: userInput.photoBookId } })
        })
        .then(photoBook => {
            return addPhotoBookThroughId(photoBook);
        })
        .then(photoBook => {
            res.json({
                photoBook: mapPhotoBookCartItem(photoBook)
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports.getPhotoBookItem = (req, res, next) => {

    getPhotoBookCartId(req.user.id)
        .then(photoBookCartId => {
            if(!photoBookCartId) {
                return res.json({ photoBooks: [] });
            }
            return PhotoBookCartItem.findAll({ where: { photoBookCartId: photoBookCartId } });
        })
        .then(photoBooks => {
            if(res.headersSent) return;
            return addPhotoBooksThroughId(photoBooks);
        })
        .then(photoBooks => {
            if(res.headersSent) return;
            res.json({
                photoBooks: mapPhotoBookCartItems(photoBooks)
            })
        })
        .catch(error => {
            next(error);
        });
}

module.exports.putPhotoBookItem = (req, res, next) => {

    const id = req.params.id;
    
    const userInput = {
        quantity: req.body.quantity
    }

    if(req.file) {
        userInput.imageUrl = `/uploads/${req.file.filename}`
    }
    
    const errors = getValidationResult(req);

    if(errors) {
        if(userInput.imageUrl) {
            deleteImage(userInput.imageUrl);
        }
        throw getError(422, 'Invalid Input', errors);
    }

    getPhotoBookCartId(req.user.id)
        .then(photoBookCartId => {
            if(!photoBookCartId) {
                throw getError(404, 'No Item Found');
            }
            return PhotoBookCartItem.findOne({ where: { photoBookCartId: photoBookCartId, id: id } });
        })
        .then(photoBook => {
            if(!photoBook) {
                throw getError(404, 'No Item Found');
            }

            if(userInput.imageUrl) {
                deleteImage(photoBook.imageUrl);
            }
             
            for(const key in userInput) {
                photoBook[key] = userInput[key];
            }
            return photoBook.save();
        })
        .then(photoBook => {
            return addPhotoBookThroughId(photoBook);
        })
        .then(photoBook => {
            res.json({
                photoBook: mapPhotoBookCartItem(photoBook)
            });
        })
        .catch(error => {
            if(userInput.imageUrl) {
                deleteImage(userInput.imageUrl);
            }
            next(error);
        });
}

module.exports.deletePhotoBookCartItem = (req, res, next) => {
    const id = req.params.id;

    getPhotoBookCartId(req.user.id)
        .then(photoBookCartId => {
            if(!photoBookCartId) {
                throw getError(404, 'No Item Found');
            }
            return PhotoBookCartItem.findOne({where: { id: id, photoBookCartId: photoBookCartId }});
        })
        .then(photoBook => {
            if(!photoBook) {
                throw getError(404, 'No Item Found');
            }
            deleteImage(photoBook.imageUrl);
            photoBook.destroy();
        })
        .then(()=>{
            res.json({
                msg: ['Item Deleted Successfully']
            });
        })
        .catch(error => {
            next(error);
        })
}