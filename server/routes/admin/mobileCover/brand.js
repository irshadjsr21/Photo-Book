const express = require('express');
const router = express.Router();

const brandController = require('../../../controllers/admin/mobileCover/brand');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.mobileCoverBrand,
  brandController.postMobileCoverBrand
);

router.get('/', brandController.getMobileCoverBrand);

router.delete('/:id', brandController.deleteMobileCoverBrand);

router.put(
  '/:id',
  validator.mobileCoverBrand,
  brandController.putMobileCoverBrand
);

module.exports = router;
