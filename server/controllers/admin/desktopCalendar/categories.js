const DesktopCalendarCategory = require('../../../models/desktopCalendarCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const {
  mapDesktopCalendarCategory,
  mapAll
} = require('../../../utils/adminMap');

// Add DesktopCalendar Category
module.exports.postDesktopCalendarCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new DesktopCalendar Category
  const desktopCalendarCategory = new DesktopCalendarCategory(userInput);

  desktopCalendarCategory
    .save()
    .then(() => {
      res.json({
        category: mapDesktopCalendarCategory(desktopCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns DesktopCalendar Categories
module.exports.getDesktopCalendarCategory = (req, res, next) => {
  // Find All DesktopCalendar Categories
  DesktopCalendarCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapDesktopCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes DesktopCalendar Category
module.exports.deleteDesktopCalendarCategory = (req, res, next) => {
  const id = req.params.id;

  // Find DesktopCalendar Category
  DesktopCalendarCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Desktop Calendar Category Found');
      }

      category
        .destroy()
        .then(() => {
          res.json({
            msg: ['Desktop Calendar Category Deleted Successfully']
          });
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
};

// Edit DesktopCalendar Category
module.exports.putDesktopCalendarCategory = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find DesktopCalendar Category
  DesktopCalendarCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Desktop Calendar Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }

      return category.save();
    })
    .then(category => {
      res.json({
        category: mapDesktopCalendarCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
