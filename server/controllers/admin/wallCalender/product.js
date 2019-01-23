const WallCalenderCategory = require('../../../models/wallCalenderCategory');
const WallCalender = require('../../../models/wallCalender');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapWallCalender, mapAll } = require('../../../utils/adminMap');

// Add WallCalender Category
module.exports.postWallCalender = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['categoryId', 'wallCalenderCategoryId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  WallCalenderCategory.findByPk(userInput.wallCalenderCategoryId)
    .then(category => {
      if (!category) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Wall Calender Category Found');
      }

      // Crate new WallCalender
      const wallCalender = new WallCalender(userInput);

      return wallCalender.save();
    })
    .then(wallCalender => {
      res.json({
        wallCalender: mapWallCalender(wallCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns WallCalender
module.exports.getWallCalender = (req, res, next) => {
  const options = {};
  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.wallCalenderCategoryId = req.query.category;
  }

  // Find All WallCalender Categories
  WallCalender.findAll({ where: options })
    .then(wallCalenders => {
      res.json({
        wallCalenders: mapAll(wallCalenders, mapWallCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes WallCalender
module.exports.deleteWallCalender = (req, res, next) => {
  const id = req.params.id;

  // Find WallCalender
  WallCalender.findByPk(id)
    .then(wallCalender => {
      if (!wallCalender) {
        throw getError(404, 'No Wall Calender Found');
      }

      return wallCalender.destroy();
    })
    .then(wallCalender => {
      deleteImage(wallCalender.imageUrl);
      res.json({
        msg: ['WallCalender Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit WallCalender
module.exports.putWallCalender = (req, res, next) => {
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

  // Find WallCalender
  WallCalender.findByPk(id)
    .then(wallCalender => {
      if (!wallCalender) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Wall Calender Found');
      }

      deleteImage(wallCalender.imageUrl);

      for (const key in userInput) {
        wallCalender[key] = userInput[key];
      }

      return wallCalender.save();
    })
    .then(wallCalender => {
      res.json({
        wallCalender: mapWallCalender(wallCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};
