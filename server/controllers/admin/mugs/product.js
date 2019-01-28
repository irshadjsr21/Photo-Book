const MugCategory = require('../../../models/mugCategory');
const Mug = require('../../../models/mug');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapMug, mapAll } = require('../../../utils/adminMap');

// Add Mug Category
module.exports.postMug = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['whitePrice'],
    ['blackPrice'],
    ['stock'],
    ['whiteOfferPrice'],
    ['blackOfferPrice'],
    ['categoryId', 'mugCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  MugCategory.findByPk(userInput.mugCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Mug Category Found');
      }

      // Crate new Mug
      const mug = new Mug(userInput);

      return mug.save();
    })
    .then(mug => {
      res.json({
        mug: mapMug(mug)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Mug
module.exports.getMug = (req, res, next) => {
  const options = {};
  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.mugCategoryId = req.query.category;
  }

  // Find All Mug Categories
  Mug.findAll({ where: options })
    .then(mugs => {
      res.json({
        mugs: mapAll(mugs, mapMug)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Mug
module.exports.deleteMug = (req, res, next) => {
  const id = req.params.id;

  // Find Mug
  Mug.findByPk(id)
    .then(mug => {
      if (!mug) {
        throw getError(404, 'No Mug Found');
      }

      return mug.destroy();
    })
    .then(mug => {
      deleteImage(mug.imageUrl);
      res.json({
        msg: ['Mug Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Mug
module.exports.putMug = (req, res, next) => {
  const id = req.params.id;

  const properties = [
    ['name'],
    ['whitePrice'],
    ['blackPrice'],
    ['stock'],
    ['whiteOfferPrice'],
    ['blackOfferPrice']
  ];

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

  // Find Mug
  Mug.findByPk(id)
    .then(mug => {
      if (!mug) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Mug Found');
      }

      if (userInput.imageUrl) {
        deleteImage(mug.imageUrl);
      }

      for (const key in userInput) {
        mug[key] = userInput[key];
      }

      return mug.save();
    })
    .then(mug => {
      res.json({
        mug: mapMug(mug)
      });
    })
    .catch(error => {
      next(error);
    });
};
