const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapWallCalenderCategory, mapAll } = require('../../../utils/adminMap');

// Add Wall Calender Category
module.exports.postWallCalenderCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new Wall Calender Category
  const wallCalenderCategory = new WallCalenderCategory(userInput);

  wallCalenderCategory
    .save()
    .then(() => {
      res.json({
        category: mapWallCalenderCategory(wallCalenderCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Wall Calender Categories
module.exports.getWallCalenderCategory = (req, res, next) => {
  // Find All Wall Calender Categories
  WallCalenderCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapWallCalenderCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Wall Calender Category
module.exports.deleteWallCalenderCategory = (req, res, next) => {
  const id = req.params.id;

  // Find Wall Calender Category
  WallCalenderCategory.findByPk(id)
    .then(wallCalender => {
      if (!wallCalender) {
        return res.status(404).json({
          msg: ['No Wall Calender Category Found']
        });
      }

      return wallCalender.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Wall Calender Category Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Wall Calender Category
module.exports.putWallCalenderCategory = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find Wall Calender Category
  WallCalenderCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Wall Calender Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }
      return category.save();
    })
    .then(category => {
      res.json({
        category: mapWallCalenderCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
