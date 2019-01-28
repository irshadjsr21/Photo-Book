const PhotoBookCategory = require('../../../models/photoBookCategory');
const PhotoBook = require('../../../models/photoBook');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapPhotoBook, mapAll } = require('../../../utils/adminMap');

// Add PhotoBook Category
module.exports.postPhotoBook = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['categoryId', 'photoBookCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  PhotoBookCategory.findByPk(userInput.photoBookCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Photo Book Category Found');
      }

      // Crate new PhotoBook
      const photoBook = new PhotoBook(userInput);

      return photoBook.save();
    })
    .then(photoBook => {
      res.json({
        photoBook: mapPhotoBook(photoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns PhotoBook
module.exports.getPhotoBook = (req, res, next) => {
  const options = {};
  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.photoBookCategoryId = req.query.category;
  }

  // Find All PhotoBook Categories
  PhotoBook.findAll({ where: options })
    .then(photoBooks => {
      res.json({
        photoBooks: mapAll(photoBooks, mapPhotoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes PhotoBook
module.exports.deletePhotoBook = (req, res, next) => {
  const id = req.params.id;

  // Find PhotoBook
  PhotoBook.findByPk(id)
    .then(photoBook => {
      if (!photoBook) {
        throw getError(404, 'No Photo Book Found');
      }

      return photoBook.destroy();
    })
    .then(photoBook => {
      deleteImage(photoBook.imageUrl);
      res.json({
        msg: ['PhotoBook Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit PhotoBook
module.exports.putPhotoBook = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name'], ['price'], ['stock'], ['offerPrice']];

  const userInput = getUserInput(req, properties, true);

  if (Object.keys(userInput).length <= 0) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'No Input');
  }

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  // Find PhotoBook
  PhotoBook.findByPk(id)
    .then(photoBook => {
      if (!photoBook) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Photo Book Found');
      }

      if (userInput.imageUrl) {
        deleteImage(photoBook.imageUrl);
      }

      for (const key in userInput) {
        photoBook[key] = userInput[key];
      }

      return photoBook.save();
    })
    .then(photoBook => {
      res.json({
        photoBook: mapPhotoBook(photoBook)
      });
    })
    .catch(error => {
      next(error);
    });
};
