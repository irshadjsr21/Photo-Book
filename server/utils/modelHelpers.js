const Cart = require('../models/cart');

// ************************************
// ********* Getting Cart Id **********
// ************************************

module.exports.getProductCartId = (ProductCart, userId) => {
  return new Promise((resolve, reject) => {
    Cart.findOne({ where: { userId: userId } })
      .then(cart => {
        if (!cart) {
          return resolve(null);
        }
        return ProductCart.findOne({ where: { cartId: cart.id } });
      })
      .then(productCart => {
        if (!productCart) {
          return resolve(null);
        }
        resolve(productCart.id);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// ************************************
// ***** Adding Models to Item ********
// ************************************

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
