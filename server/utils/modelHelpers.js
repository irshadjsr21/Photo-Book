const Mug = require('../models/mug');
const Cart = require('../models/cart');
const MugCart = require('../models/mugCart');
const { mapMug } = require('./map');

module.exports.addMugThroughId = (item) => {
    return new Promise((resolve, reject) => {
        if(!item.mugId) {
            resolve(item);
        }
        const newItem = item.dataValues;
    
        Mug.findByPk(newItem.mugId)
            .then(mug => {
                if(!mug) {
                    newItem.mug = {}
                } else {
                    newItem.mug = mapMug(mug);
                }
                resolve(newItem);
            })
            .catch(error => {
                reject(error);
            });
    })
}

module.exports.addMugsThroughId = async (items) => {
    return new Promise(async (resolve, reject) => {
        if(!items || items.length <= 0) {
            resolve([]);
        }

        try {
            const newItems = [];
            for(const item of items) {
                const newItem = await module.exports.addMugThroughId(item)
                newItems.push(newItem);
            }
            resolve(newItems);
        } catch(error) {
            reject(error);
        }
    })
}

module.exports.getMugCartId = (userId) => {
    return new Promise((resolve, reject) => {
        Cart.findOne({ where: { userId: userId } })
            .then(cart => {
                if(!cart) {
                    return resolve(null);
                }
                return MugCart.findOne({ where: { cartId: cart.id } });
            })
            .then(mugCart => {
                if(!mugCart) {
                    return resolve(null);
                }
                resolve(mugCart.id);
            })
            .catch(error => {
                reject(error);
            })
    })
}