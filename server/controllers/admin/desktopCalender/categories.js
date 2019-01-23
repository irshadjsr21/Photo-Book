const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const {
  mapDesktopCalenderCategory,
  mapAll
} = require('../../../utils/adminMap');

// Add DesktopCalender Category
module.exports.postDesktopCalenderCategory = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new DesktopCalender Category
  const desktopCalenderCategory = new DesktopCalenderCategory(userInput);

  desktopCalenderCategory
    .save()
    .then(() => {
      res.json({
        category: mapDesktopCalenderCategory(desktopCalenderCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns DesktopCalender Categories
module.exports.getDesktopCalenderCategory = (req, res, next) => {
  // Find All DesktopCalender Categories
  DesktopCalenderCategory.findAll()
    .then(categories => {
      res.json({
        categories: mapAll(categories, mapDesktopCalenderCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes DesktopCalender Category
module.exports.deleteDesktopCalenderCategory = (req, res, next) => {
  const id = req.params.id;

  // Find DesktopCalender Category
  DesktopCalenderCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Desktop Calender Category Found');
      }

      category
        .destroy()
        .then(() => {
          res.json({
            msg: ['Desktop Calender Category Deleted Successfully']
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

// Edit DesktopCalender Category
module.exports.putDesktopCalenderCategory = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find DesktopCalender Category
  DesktopCalenderCategory.findByPk(id)
    .then(category => {
      if (!category) {
        throw getError(404, 'No Desktop Calender Category Found');
      }

      for (const key in userInput) {
        category[key] = userInput[key];
      }

      return category.save();
    })
    .then(category => {
      res.json({
        category: mapDesktopCalenderCategory(category)
      });
    })
    .catch(error => {
      next(error);
    });
};
