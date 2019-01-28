const express = require('express');
const router = express.Router();

const controller = require('../../controllers/products/mobileCover');

router.get('/brand', controller.getMobileCoverBrand);

router.get('/model', controller.getMobileCoverModel);

router.get('/', controller.getMobileCover);

module.exports = router;
