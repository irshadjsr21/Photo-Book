const MugCart = require('../../models/mugCart');
const Mug = require('../../models/mug');
const Cart = require('../../models/cart');
const MugCartItem = require('../../models/mugCartItem');

const {
  getError,
  getValidationResult,
  deleteImage,
  getUserInput
} = require('../../utils/helperFunctions');

const { mapMugCartItem, mapMug, mapAll } = require('../../utils/map');

const {
  getMugCartId,
  addModelThroughId,
  addAllModelThroughId
} = require('../../utils/modelHelpers');

// Add Mug to Cart
module.exports.postMugItem = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const mugId = req.body.mugId;

  const properties = [['colour'], ['quantity']];
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
    .then(carts => {
      return MugCart.findOrCreate({ where: { cartId: carts[0].id } });
    })
    .then(mugCarts => {
      const mugCart = mugCarts[0];
      fetchedCart = mugCart;
      return fetchedCart.getMugs({ where: { id: mugId } });
    })
    .then(mugs => {
      if (mugs.length > 0) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Item Already Exists');
      }
      return Mug.findByPk(mugId);
    })
    .then(mug => {
      if (!mug) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Mug Found');
      }

      if (mug.stock <= 0) {
        deleteImage(userInput.imageUrl);
        throw getError(422, 'Out of Stock');
      }

      return fetchedCart.addMug(mug, {
        through: {
          ...userInput
        }
      });
    })
    .then(() => {
      return MugCartItem.findOne({
        where: { mugCartId: fetchedCart.id, mugId: mugId }
      });
    })
    .then(mug => {
      return addModelThroughId(mug, Mug, {
        fromKey: 'mugId',
        toKey: 'product',
        mapFunction: mapMug
      });
    })
    .then(mug => {
      res.json({
        mug: mapMugCartItem(mug)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Mug Cart Items
module.exports.getMugItem = (req, res, next) => {
  getMugCartId(req.user.id)
    .then(mugCartId => {
      if (!mugCartId) {
        return res.json({ mugs: [] });
      }
      return MugCartItem.findAll({ where: { mugCartId: mugCartId } });
    })
    .then(mugs => {
      if (res.headersSent) return;
      return addAllModelThroughId(mugs, Mug, {
        fromKey: 'mugId',
        toKey: 'product',
        mapFunction: mapMug
      });
    })
    .then(mugs => {
      if (res.headersSent) return;
      res.json({
        mugs: mapAll(mugs, mapMugCartItem)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Mug Cart Item
module.exports.putMugItem = (req, res, next) => {
  const id = req.params.id;

  const properties = [['colour'], ['quantity']];

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

  getMugCartId(req.user.id)
    .then(mugCartId => {
      if (!mugCartId) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Item Found');
      }
      return MugCartItem.findOne({ where: { mugCartId: mugCartId, id: id } });
    })
    .then(mug => {
      if (!mug) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Item Found');
      }

      if (userInput.imageUrl) {
        deleteImage(mug.imageUrl);
      }

      for (const key in userInput) {
        mug[key] = userInput[key];
      }
      return mug.save();
    })
    .then(mug => {
      return addModelThroughId(mug, Mug, {
        fromKey: 'mugId',
        toKey: 'product',
        mapFunction: mapMug
      });
    })
    .then(mug => {
      res.json({
        mug: mapMugCartItem(mug)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Delete Mug Cart Item
module.exports.deleteMugCartItem = (req, res, next) => {
  const id = req.params.id;

  getMugCartId(req.user.id)
    .then(mugCartId => {
      if (!mugCartId) {
        throw getError(404, 'No Item Found');
      }
      return MugCartItem.findOne({ where: { id: id, mugCartId: mugCartId } });
    })
    .then(mug => {
      if (!mug) {
        throw getError(404, 'No Item Found');
      }
      deleteImage(mug.imageUrl);
      mug.destroy();
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
