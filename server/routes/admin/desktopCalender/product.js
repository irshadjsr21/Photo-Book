const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/desktopCalender/product');
const validator = require('../../../middlewares/validator');
const upload = require('../../../middlewares/upload');

router.post('/', upload.single('image'), validator.desktopCalender, productController.postDesktopCalender);

router.get('/', productController.getDesktopCalender);

router.delete('/:id', productController.deleteDesktopCalender);

router.post('/:id', upload.single('image'), validator.desktopCalender, productController.putDesktopCalender);

module.exports = router;