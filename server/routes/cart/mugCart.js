const express = require('express');
const router = express.Router();

const validator = require('../../middlewares/validator');
const controller = require('../../controllers/cart/mugCart');
const upload = require('../../middlewares/upload');

router.post('/', upload.single('image'), validator.postMugCart, controller.postMugItem);

router.get('/', controller.getMugItem);

router.post('/:id', upload.single('image'), validator.putMugCart, controller.putMugItem);

router.delete('/:id', controller.deleteMugCartItem);

module.exports = router;