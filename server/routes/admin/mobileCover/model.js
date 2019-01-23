const express = require('express');
const router = express.Router();

const modelController = require('../../../controllers/admin/mobileCover/model');
const validator = require('../../../middlewares/adminValidator');

router.post(
  '/',
  validator.mobileCoverModel,
  modelController.postMobileCoverModel
);

router.get('/', modelController.getMobileCoverModel);

router.delete('/:id', modelController.deleteMobileCoverModel);

router.put(
  '/:id',
  validator.mobileCoverModel,
  modelController.putMobileCoverModel
);

module.exports = router;
