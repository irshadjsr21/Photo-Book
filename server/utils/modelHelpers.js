const Mug = require('../models/mug');
const Cart = require('../models/cart');
const MugCart = require('../models/mugCart');
const PhotoBook = require('../models/photoBook');
const PhotoBookCart = require('../models/photoBookCart');
const { mapPhotoBook } = require('./map');

module.exports.getMugCartId = userId => {
  return new Promise((resolve, reject) => {
    Cart.findOne({ where: { userId: userId } })
      .then(cart => {
        if (!cart) {
          return resolve(null);
        }
        return MugCart.findOne({ where: { cartId: cart.id } });
      })
      .then(mugCart => {
        if (!mugCart) {
          return resolve(null);
        }
        resolve(mugCart.id);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports.addPhotoBookThroughId = item => {
  return new Promise((resolve, reject) => {
    if (!item.photoBookId) {
      resolve(item);
    }
    const newItem = item.dataValues;

    PhotoBook.findByPk(newItem.photoBookId)
      .then(photoBook => {
        if (!photoBook) {
          newItem.product = {};
        } else {
          newItem.product = mapPhotoBook(photoBook);
        }
        resolve(newItem);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports.addPhotoBooksThroughId = async items => {
  return new Promise(async (resolve, reject) => {
    if (!items || items.length <= 0) {
      resolve([]);
    }

    try {
      const newItems = [];
      for (const item of items) {
        const newItem = await module.exports.addPhotoBookThroughId(item);
        newItems.push(newItem);
      }
      resolve(newItems);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getPhotoBookCartId = userId => {
  return new Promise((resolve, reject) => {
    Cart.findOne({ where: { userId: userId } })
      .then(cart => {
        if (!cart) {
          return resolve(null);
        }
        return PhotoBookCart.findOne({ where: { cartId: cart.id } });
      })
      .then(photoBookCart => {
        if (!photoBookCart) {
          return resolve(null);
        }
        resolve(photoBookCart.id);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports.addModelThroughId = (
  item,
  Model,
  { fromKey, toKey, mapFunction }
) => {
  return new Promise((resolve, reject) => {
    if (!item[fromKey]) {
      resolve(item);
    }
    const newItem = item.dataValues;

    Model.findByPk(newItem[fromKey])
      .then(itemToAdd => {
        if (!itemToAdd) {
          newItem[toKey] = {};
        } else {
          newItem[toKey] = mapFunction ? mapFunction(itemToAdd) : itemToAdd;
        }
        resolve(newItem);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports.addAllModelThroughId = async (
  items,
  Model,
  { fromKey, toKey, mapFunction }
) => {
  return new Promise(async (resolve, reject) => {
    if (!items || items.length <= 0) {
      resolve([]);
    }

    try {
      const newItems = [];
      for (const item of items) {
        const newItem = await module.exports.addModelThroughId(item, Model, {
          fromKey,
          toKey,
          mapFunction
        });
        newItems.push(newItem);
      }
      resolve(newItems);
    } catch (error) {
      reject(error);
    }
  });
};
