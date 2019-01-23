const DesktopCalenderCategory = require('../../../models/desktopCalenderCategory');
const DesktopCalender = require('../../../models/desktopCalender');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapDesktopCalender, mapAll } = require('../../../utils/adminMap');

// Add DesktopCalender Category
module.exports.postDesktopCalender = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['categoryId', 'desktopCalenderCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  DesktopCalenderCategory.findByPk(userInput.desktopCalenderCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Desktop Calender Category Found');
      }

      // Crate new DesktopCalender
      const desktopCalender = new DesktopCalender(userInput);

      return desktopCalender.save();
    })
    .then(desktopCalender => {
      res.json({
        desktopCalender: mapDesktopCalender(desktopCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns DesktopCalender
module.exports.getDesktopCalender = (req, res, next) => {
  const options = {};

  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.desktopCalenderCategoryId = req.query.category;
  }

  // Find All DesktopCalender Categories
  DesktopCalender.findAll({ where: options })
    .then(desktopCalenders => {
      res.json({
        desktopCalenders: mapAll(desktopCalenders, mapDesktopCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes DesktopCalender
module.exports.deleteDesktopCalender = (req, res, next) => {
  const id = req.params.id;

  // Find DesktopCalender
  DesktopCalender.findByPk(id)
    .then(desktopCalender => {
      if (!desktopCalender) {
        throw getError(404, 'No Desktop Calender Found');
      }

      return desktopCalender.destroy();
    })
    .then(desktopCalender => {
      deleteImage(desktopCalender.imageUrl);
      res.json({
        msg: ['Desktop Calender Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit DesktopCalender
module.exports.putDesktopCalender = (req, res, next) => {
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

  // Find DesktopCalender
  DesktopCalender.findByPk(id)
    .then(desktopCalender => {
      if (!desktopCalender) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Desktop Calender Found');
      }

      if (userInput.imageUrl) {
        deleteImage(desktopCalender.imageUrl);
      }

      for (const key in userInput) {
        desktopCalender[key] = userInput[key];
      }

      return desktopCalender.save();
    })
    .then(desktopCalender => {
      res.json({
        desktopCalender: mapDesktopCalender(desktopCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};
