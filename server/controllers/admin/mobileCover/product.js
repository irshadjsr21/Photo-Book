const MobileCoverModel = require('../../../models/mobileCoverModel');
const MobileCover = require('../../../models/mobileCover');
const {
  deleteImage,
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapMobileCover, mapAll } = require('../../../utils/adminMap');

// Add MobileCover Category
module.exports.postMobileCover = (req, res, next) => {
  if (!req.file) {
    throw getError(422, 'Invalid Image');
  }

  const properties = [
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['modelId', 'mobileCoverModelId']
  ];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    deleteImage(userInput.imageUrl);
    throw getError(422, 'Invalid Input', errors);
  }

  MobileCoverModel.findByPk(userInput.mobileCoverModelId)
    .then(model => {
      if (!model) {
        deleteImage(userInput.imageUrl);
        throw getError(404, 'No Mobile Cover Model Found');
      }

      // Crate new MobileCover
      const mobileCover = new MobileCover(userInput);

      return mobileCover.save();
    })
    .then(mobileCover => {
      res.json({
        mobileCover: mapMobileCover(mobileCover)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns MobileCover
module.exports.getMobileCover = (req, res, next) => {
  const options = {};
  if (req.query.id) {
    options.id = req.query.id;
  } else if (req.query.category) {
    options.mobileCoverModelId = req.query.model;
  }

  // Find All MobileCover Categories
  MobileCover.findAll({ where: options })
    .then(mobileCovers => {
      res.json({
        mobileCovers: mapAll(mobileCovers, mapMobileCover)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes MobileCover
module.exports.deleteMobileCover = (req, res, next) => {
  const id = req.params.id;

  // Find MobileCover
  MobileCover.findByPk(id)
    .then(mobileCover => {
      if (!mobileCover) {
        throw getError(404, 'No Mobile Cover Found');
      }

      return mobileCover.destroy();
    })
    .then(mobileCover => {
      deleteImage(mobileCover.imageUrl);
      res.json({
        msg: ['Mobile Cover Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit MobileCover
module.exports.putMobileCover = (req, res, next) => {
  const id = req.params.id;

  const properties = [['name'], ['price'], ['stock'], ['offerPrice']];

  const userInput = getUserInput(req, properties, true);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find MobileCover
  MobileCover.findByPk(id)
    .then(mobileCover => {
      if (!mobileCover) {
        if (userInput.imageUrl) {
          deleteImage(userInput.imageUrl);
        }
        throw getError(404, 'No Mobile Cover Found');
      }

      if (userInput.imageUrl) {
        deleteImage(mobileCover.imageUrl);
      }

      for (const key in userInput) {
        mobileCover[key] = userInput[key];
      }

      return mobileCover.save();
    })
    .then(mobileCover => {
      res.json({
        mobileCover: mapMobileCover(mobileCover)
      });
    })
    .catch(error => {
      next(error);
    });
};
