const DesktopCalendarCategory = require('../../../models/desktopCalendarCategory');
const DesktopCalendar = require('../../../models/desktopCalendar');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapDesktopCalendar, mapAll } = require('../../../utils/adminMap');

// Add DesktopCalendar Category
module.exports.postDesktopCalendar = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['categoryId', 'desktopCalendarCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  DesktopCalendarCategory.findByPk(userInput.desktopCalendarCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Desktop Calendar Category Found');
      }

      // Crate new DesktopCalendar
      const desktopCalendar = new DesktopCalendar(userInput);

      return desktopCalendar.save();
    })
    .then(desktopCalendar => {
      res.json({
        desktopCalendar: mapDesktopCalendar(desktopCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns DesktopCalendar
module.exports.getDesktopCalendar = (req, res, next) => {
  const options = {};

  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.desktopCalendarCategoryId = req.query.category;
  }

  // Find All DesktopCalendar Categories
  DesktopCalendar.findAll({ where: options })
    .then(desktopCalendars => {
      res.json({
        desktopCalendars: mapAll(desktopCalendars, mapDesktopCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes DesktopCalendar
module.exports.deleteDesktopCalendar = (req, res, next) => {
  const id = req.params.id;

  // Find DesktopCalendar
  DesktopCalendar.findByPk(id)
    .then(desktopCalendar => {
      if (!desktopCalendar) {
        throw getError(404, 'No Desktop Calendar Found');
      }

      return desktopCalendar.destroy();
    })
    .then(desktopCalendar => {
      deleteImage(desktopCalendar.imageUrl);
      res.json({
        msg: ['Desktop Calendar Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit DesktopCalendar
module.exports.putDesktopCalendar = (req, res, next) => {
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

  // Find DesktopCalendar
  DesktopCalendar.findByPk(id)
    .then(desktopCalendar => {
      if (!desktopCalendar) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Desktop Calendar Found');
      }

      if (userInput.imageUrl) {
        deleteImage(desktopCalendar.imageUrl);
      }

      for (const key in userInput) {
        desktopCalendar[key] = userInput[key];
      }

      return desktopCalendar.save();
    })
    .then(desktopCalendar => {
      res.json({
        desktopCalendar: mapDesktopCalendar(desktopCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};
