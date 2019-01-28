const WallCalendarCategory = require('../../../models/wallCalendarCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapWallCalendarCategory, mapAll } = require('../../../utils/adminMap');

// Add Wall Calendar Category
module.exports.postWallCalendarCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new Wall Calendar Category
  const wallCalendarCategory = new WallCalendarCategory(userInput);

  wallCalendarCategory
    .save()
    .then(() => {
      res.json({
        category: mapWallCalendarCategory(wallCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Wall Calendar Categories
module.exports.getWallCalendarCategory = (req, res, next) => {
  // Find All Wall Calendar Categories
  WallCalendarCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapWallCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Wall Calendar Category
module.exports.deleteWallCalendarCategory = (req, res, next) => {
  const id = req.params.id;

  // Find Wall Calendar Category
  WallCalendarCategory.findByPk(id)
    .then(wallCalendar => {
      if (!wallCalendar) {
        return res.status(404).json({
          msg: ['No Wall Calendar Category Found']
        });
      }

      return wallCalendar.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Wall Calendar Category Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Wall Calendar Category
module.exports.putWallCalendarCategory = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find Wall Calendar Category
  WallCalendarCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Wall Calendar Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }
      return category.save();
    })
    .then(category => {
      res.json({
        category: mapWallCalendarCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
