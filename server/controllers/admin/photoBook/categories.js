const PhotoBookCategory = require('../../../models/photoBookCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapPhotoBookCategory, mapAll } = require('../../../utils/adminMap');

// Add Photo Book Category
module.exports.postPhotoBookCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new Photo Book Category
  const photoBookCategory = new PhotoBookCategory(userInput);

  photoBookCategory
    .save()
    .then(() => {
      res.json({
        category: mapPhotoBookCategory(photoBookCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Photo Book Categories
module.exports.getPhotoBookCategory = (req, res, next) => {
  // Find All Photo Book Categories
  PhotoBookCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapPhotoBookCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Photo Book Category
module.exports.deletePhotoBookCategory = (req, res, next) => {
  const id = req.params.id;

  // Find Photo Book Category
  PhotoBookCategory.findByPk(id)
    .then(photoBook => {
      if (!photoBook) {
        throw getError(404, 'No Photo Book Category Found');
      }

      return photoBook.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Photo Book Category Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Photo Book Category
module.exports.putPhotoBookCategory = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find Photo Book Category
  PhotoBookCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Photo Book Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }
      return category.save();
    })
    .then(category => {
      res.json({
        category: mapPhotoBookCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
