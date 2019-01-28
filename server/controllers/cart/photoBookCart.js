const PhotoBookCart = require('../../models/photoBookCart');
const PhotoBook = require('../../models/photoBook');
const Cart = require('../../models/cart');
const PhotoBookCartItem = require('../../models/photoBookCartItem');

const {
  getError,
  getValidationResult,
  deleteImage,
  getUserInput
} = require('../../utils/helperFunctions');

const {
  mapPhotoBookCartItem,
  mapPhotoBook,
  mapAll
} = require('../../utils/map');

const {
  getProductCartId,
  addModelThroughId,
  addAllModelThroughId
} = require('../../utils/modelHelpers');

// Add to Photo Book Cart
module.exports.postPhotoBookItem = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const photoBookId = req.body.productId;

  const properties = [['quantity']];
  const userInput = getUserInput(req, properties, true);

  if (!userInput.quantity) {
    userInput.quantity = 1;
  }

  let fetchedCart;

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  Cart.findOrCreate({ where: { userId: req.user.id } })
    .then(cart => {
      return PhotoBookCart.findOrCreate({ where: { cartId: cart[0].id } });
    })
    .then(photoBookCarts => {
      const photoBookCart = photoBookCarts[0];
      fetchedCart = photoBookCart;
      return fetchedCart.getPhotoBooks({
        where: { id: photoBookId }
      });
    })
    .then(photoBooks => {
      if (photoBooks.length > 0) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Item Already Exists');
      }
      return PhotoBook.findByPk(photoBookId);
    })
    .then(photoBook => {
      if (!photoBook) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No PhotoBook Found');
      }

      if (photoBook.stock <= 0) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Out of Stock');
      }

      return fetchedCart.addPhotoBook(photoBook, {
        through: { quantity: userInput.quantity, imageUrl: userInput.imageUrl }
      });
    })
    .then(() => {
      return PhotoBookCartItem.findOne({
        where: {
          photoBookCartId: fetchedCart.id,
          photoBookId: photoBookId
        }
      });
    })
    .then(photoBook => {
      return addModelThroughId(photoBook, PhotoBook, {
        fromKey: 'photoBookId',
        toKey: 'product',
        mapFunction: mapPhotoBook
      });
    })
    .then(photoBook => {
      res.json({
        photoBook: mapPhotoBookCartItem(photoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Photo Book Cart Item
module.exports.getPhotoBookItem = (req, res, next) => {
  getProductCartId(PhotoBookCart, req.user.id)
    .then(photoBookCartId => {
      if (!photoBookCartId) {
        return res.json({ photoBooks: [] });
      }
      return PhotoBookCartItem.findAll({
        where: { photoBookCartId: photoBookCartId }
      });
    })
    .then(photoBooks => {
      if (res.headersSent) return;
      return addAllModelThroughId(photoBooks, PhotoBook, {
        fromKey: 'photoBookId',
        toKey: 'product',
        mapFunction: mapPhotoBook
      });
    })
    .then(photoBooks => {
      if (res.headersSent) return;
      res.json({
        photoBooks: mapAll(photoBooks, mapPhotoBookCartItem)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Photo Book Cart Item
module.exports.putPhotoBookItem = (req, res, next) => {
  const id = req.params.id;

  const properties = [['quantity']];

  const userInput = getUserInput(req, properties, true);

  if (Object.keys(userInput).length <= 0) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'No Input');
  }

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  getProductCartId(PhotoBookCart, req.user.id)
    .then(photoBookCartId => {
      if (!photoBookCartId) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Item Found');
      }
      return PhotoBookCartItem.findOne({
        where: { photoBookCartId: photoBookCartId, id: id }
      });
    })
    .then(photoBook => {
      if (!photoBook) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Item Found');
      }

      if (userInput.imageUrl) {
        deleteImage(photoBook.imageUrl);
      }

      for (const key in userInput) {
        photoBook[key] = userInput[key];
      }
      return photoBook.save();
    })
    .then(photoBook => {
      return addModelThroughId(photoBook, PhotoBook, {
        fromKey: 'photoBookId',
        toKey: 'product',
        mapFunction: mapPhotoBook
      });
    })
    .then(photoBook => {
      res.json({
        photoBook: mapPhotoBookCartItem(photoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Delete Photo Book Cart Item
module.exports.deletePhotoBookCartItem = (req, res, next) => {
  const id = req.params.id;

  getProductCartId(PhotoBookCart, req.user.id)
    .then(photoBookCartId => {
      if (!photoBookCartId) {
        throw getError(404, 'No Item Found');
      }
      return PhotoBookCartItem.findOne({
        where: { id: id, photoBookCartId: photoBookCartId }
      });
    })
    .then(photoBook => {
      if (!photoBook) {
        throw getError(404, 'No Item Found');
      }
      deleteImage(photoBook.imageUrl);
      photoBook.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Item Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};
