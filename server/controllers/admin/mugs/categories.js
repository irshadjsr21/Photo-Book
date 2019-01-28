const MugCategory = require('../../../models/mugCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapMugCategory, mapAll } = require('../../../utils/adminMap');

// Add Mug Category
module.exports.postMugCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new Mug Category
  const mugCategory = new MugCategory(userInput);

  mugCategory
    .save()
    .then(() => {
      res.json({
        category: mapMugCategory(mugCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Mug Categories
module.exports.getMugCategory = (req, res, next) => {
  // Find All Mug Categories
  MugCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapMugCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Mug Category
module.exports.deleteMugCategory = (req, res, next) => {
  const id = req.params.id;

  // Find Mug Category
  MugCategory.findByPk(id)
    .then(mug => {
      if (!mug) {
        throw getError(404, 'No Mug Category Found');
      }

      return mug.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Mug Category Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Mug Category
module.exports.putMugCategory = (req, res, next) => {
  const id = req.params.id;

  const errors = getValidationResult(req);

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find Mug Category
  MugCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Mug Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }
      return category.save();
    })
    .then(category => {
      res.json({
        category: mapMugCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
