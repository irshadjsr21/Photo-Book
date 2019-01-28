const express = require('express');
const router = express.Router();

const validator = require('../../middlewares/validator');
const controller = require('../../controllers/cart/photoBookCart');
const upload = require('../../middlewares/upload');

router.post('/', upload.single('image'), validator.postPhotoBookCart, controller.postPhotoBookItem);

router.get('/', controller.getPhotoBookItem);

router.post('/:id', upload.single('image'), validator.putPhotoBookCart, controller.putPhotoBookItem);

router.delete('/:id', controller.deletePhotoBookCartItem);

module.exports = router;