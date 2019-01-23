const Mug = require('../models/mug');
const Cart = require('../models/cart');
const MugCart = require('../models/mugCart');
const PhotoBook = require('../models/photoBook');
const PhotoBookCart = require('../models/photoBookCart');
const { mapMug, mapPhotoBook } = require('./map');

module.exports.addMugThroughId = (item) => {
    return new Promise((resolve, reject) => {
        if(!item.mugId) {
            resolve(item);
        }
        const newItem = item.dataValues;
    
        Mug.findByPk(newItem.mugId)
            .then(mug => {
                if(!mug) {
                    newItem.product = {}
                } else {
                    newItem.product = mapMug(mug);
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


module.exports.addPhotoBookThroughId = (item) => {
    return new Promise((resolve, reject) => {
        if(!item.photoBookId) {
            resolve(item);
        }
        const newItem = item.dataValues;
    
        PhotoBook.findByPk(newItem.photoBookId)
            .then(photoBook => {
                if(!photoBook) {
                    newItem.product = {}
                } else {
                    newItem.product = mapPhotoBook(photoBook);
                }
                resolve(newItem);
            })
            .catch(error => {
                reject(error);
            });
    })
}

module.exports.addPhotoBooksThroughId = async (items) => {
    return new Promise(async (resolve, reject) => {
        if(!items || items.length <= 0) {
            resolve([]);
        }

        try {
            const newItems = [];
            for(const item of items) {
                const newItem = await module.exports.addPhotoBookThroughId(item)
                newItems.push(newItem);
            }
            resolve(newItems);
        } catch(error) {
            reject(error);
        }
    })
}

module.exports.getPhotoBookCartId = (userId) => {
    return new Promise((resolve, reject) => {
        Cart.findOne({ where: { userId: userId } })
            .then(cart => {
                if(!cart) {
                    return resolve(null);
                }
                return PhotoBookCart.findOne({ where: { cartId: cart.id } });
            })
            .then(photoBookCart => {
                if(!photoBookCart) {
                    return resolve(null);
                }
                resolve(photoBookCart.id);
            })
            .catch(error => {
                reject(error);
            })
    })
}