const PhotoBook = require('../../models/photoBook');
const PhotoBookCategory = require('../../models/photoBookCategory');

const { getQuery } = require('../../utils/helperFunctions');
const {
  mapPhotoBook,
  mapPhotoBookCategory,
  mapAll
} = require('../../utils/map');

// Get Photo Book Category
module.exports.getPhotoBookCategory = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  PhotoBookCategory.findAll({ where: options })
    .then(categories => {
      return res.status(200).json({
        categories: mapAll(categories, mapPhotoBookCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Photo Book
module.exports.getPhotoBook = (req, res, next) => {
  const properties = [['id'], ['category', 'photoBookCategoryId']];

  const options = getQuery(req, properties);

  PhotoBook.findAll({ where: options })
    .then(photoBooks => {
      res.status(200).json({
        photoBooks: mapAll(photoBooks, mapPhotoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};
