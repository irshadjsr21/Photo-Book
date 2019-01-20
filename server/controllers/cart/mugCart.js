const MugCart = require('../../models/mugCart');
const Mug = require('../../models/mug');
const Cart = require('../../models/cart');
const MugCartItem = require('../../models/mugCartItem')
const { getError, getValidationResult, deleteImage } = require('../../utils/helperFunctions');
const { mapMugCartItems, mapMugCartItem } = require('../../utils/map');
const { addMugsThroughId, addMugThroughId , getMugCartId } = require('../../utils/modelHelpers');

module.exports.postMugItem = (req, res, next) => {

    if(!req.file) {
        throw getError(422, 'Invalid Image');
    }

    const userInput = {
        mugId: req.body.mugId,
        colour: req.body.colour,
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
            return MugCart.findOrCreate({where : { cartId: cart[0].id }});
        })
        .then(mugCarts => {
            const mugCart = mugCarts[0];
            fetchedCart = mugCart;
            return fetchedCart.getMugs({ where: { id: userInput.mugId } });
        })
        .then(mugs => {
            if(mugs.length > 0) {
                deleteImage(userInput.imageUrl);
                throw getError(422, 'Item Already Exists');
            }
            return Mug.findByPk(userInput.mugId);
        })
        .then(mug => {
            if(!mug) {
                deleteImage(userInput.imageUrl);                
                throw getError(404, 'No Mug Found');
            }
            return fetchedCart.addMug(mug, { through: {quantity: userInput.quantity, colour: userInput.colour, imageUrl: userInput.imageUrl} });
        })
        .then(() => {
            return MugCartItem.findOne({ where: { mugCartId: fetchedCart.id, mugId: userInput.mugId } })
        })
        .then(mug => {
            return addMugThroughId(mug);
        })
        .then(mug => {
            res.json({
                mug: mapMugCartItem(mug)
            });
        })
        .catch(error => {
            next(error);
        })

}

module.exports.getMugItem = (req, res, next) => {

    getMugCartId(req.user.id)
        .then(mugCartId => {
            if(!mugCartId) {
                return res.json({ mugs: [] });
            }
            return MugCartItem.findAll({ where: { mugCartId: mugCartId } });
        })
        .then(mugs => {
            if(res.headersSent) return;
            return addMugsThroughId(mugs);
        })
        .then(mugs => {
            if(res.headersSent) return;
            res.json({
                mugs: mapMugCartItems(mugs)
            })
        })
        .catch(error => {
            next(error);
        });
}

module.exports.putMugItem = (req, res, next) => {

    const id = req.params.id;
    
    const userInput = {
        colour: req.body.colour,
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

    getMugCartId(req.user.id)
        .then(mugCartId => {
            if(!mugCartId) {
                throw getError(404, 'No Item Found');
            }
            return MugCartItem.findOne({ where: { mugCartId: mugCartId, id: id } });
        })
        .then(mug => {
            if(!mug) {
                throw getError(404, 'No Item Found');
            }

            if(userInput.imageUrl) {
                deleteImage(mug.imageUrl);
            }
             
            for(const key in userInput) {
                mug[key] = userInput[key];
            }
            return mug.save();
        })
        .then(mug => {
            return addMugThroughId(mug);
        })
        .then(mug => {
            res.json({
                mug: mapMugCartItem(mug)
            });
        })
        .catch(error => {
            if(userInput.imageUrl) {
                deleteImage(userInput.imageUrl);
            }
            next(error);
        });
}

module.exports.deleteMugCartItem = (req, res, next) => {
    const id = req.params.id;

    getMugCartId(req.user.id)
        .then(mugCartId => {
            if(!mugCartId) {
                throw getError(404, 'No Item Found');
            }
            return MugCartItem.findOne({where: { id: id, mugCartId: mugCartId }});
        })
        .then(mug => {
            if(!mug) {
                throw getError(404, 'No Item Found');
            }
            deleteImage(mug.imageUrl);
            mug.destroy();
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