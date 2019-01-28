const WallCalendarCategory = require('../../../models/wallCalendarCategory');
const WallCalendar = require('../../../models/wallCalendar');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapWallCalendar, mapAll } = require('../../../utils/adminMap');

// Add WallCalendar Category
module.exports.postWallCalendar = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['categoryId', 'wallCalendarCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  WallCalendarCategory.findByPk(userInput.wallCalendarCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Wall Calendar Category Found');
      }

      // Crate new WallCalendar
      const wallCalendar = new WallCalendar(userInput);

      return wallCalendar.save();
    })
    .then(wallCalendar => {
      res.json({
        wallCalendar: mapWallCalendar(wallCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns WallCalendar
module.exports.getWallCalendar = (req, res, next) => {
  const options = {};
  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.wallCalendarCategoryId = req.query.category;
  }

  // Find All WallCalendar Categories
  WallCalendar.findAll({ where: options })
    .then(wallCalendars => {
      res.json({
        wallCalendars: mapAll(wallCalendars, mapWallCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes WallCalendar
module.exports.deleteWallCalendar = (req, res, next) => {
  const id = req.params.id;

  // Find WallCalendar
  WallCalendar.findByPk(id)
    .then(wallCalendar => {
      if (!wallCalendar) {
        throw getError(404, 'No Wall Calendar Found');
      }

      return wallCalendar.destroy();
    })
    .then(wallCalendar => {
      deleteImage(wallCalendar.imageUrl);
      res.json({
        msg: ['WallCalendar Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit WallCalendar
module.exports.putWallCalendar = (req, res, next) => {
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

  // Find WallCalendar
  WallCalendar.findByPk(id)
    .then(wallCalendar => {
      if (!wallCalendar) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Wall Calendar Found');
      }

      deleteImage(wallCalendar.imageUrl);

      for (const key in userInput) {
        wallCalendar[key] = userInput[key];
      }

      return wallCalendar.save();
    })
    .then(wallCalendar => {
      res.json({
        wallCalendar: mapWallCalendar(wallCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};
