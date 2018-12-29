const express = require('express');
const router = express.Router();

const gallaryController = require('../controllers/gallary');
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'),gallaryController.postGallary)

router.get('/', gallaryController.getGallary);

router.delete('/:id', gallaryController.deleteGallary);

module.exports = router;