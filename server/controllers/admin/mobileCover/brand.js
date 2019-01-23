const MobileCoverBrand = require('../../../models/mobileCoverBrand');
const {
  getError,
  getValidationResult,
  getUserInput
} = require('../../../utils/helperFunctions');
const { mapMobileCoverBrand, mapAll } = require('../../../utils/adminMap');

// Add Mobile Cover Brand
module.exports.postMobileCoverBrand = (req, res, next) => {
  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  const errors = getValidationResult(req);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Crate new Mobile Cover Brand
  const mobileCoverBrand = new MobileCoverBrand(userInput);

  mobileCoverBrand
    .save()
    .then(() => {
      res.json({
        brand: mapMobileCoverBrand(mobileCoverBrand)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Returns Mug Categories
module.exports.getMobileCoverBrand = (req, res, next) => {
  // Find All Mug Categories
  MobileCoverBrand.findAll()
    .then(brands => {
      res.json({
        brands: mapAll(brands, mapMobileCoverBrand)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Deletes Mobile Cover Brand
module.exports.deleteMobileCoverBrand = (req, res, next) => {
  const id = req.params.id;

  // Find Mobile Cover Brand
  MobileCoverBrand.findByPk(id)
    .then(brand => {
      if (!brand) {
        throw getError(404, 'No Mobile Cover Brand Found');
      }

      return brand.destroy();
    })
    .then(() => {
      res.json({
        msg: ['Mobile Cover Brand Deleted Successfully']
      });
    })
    .catch(error => {
      next(error);
    });
};

// Edit Mobile Cover Brand
module.exports.putMobileCoverBrand = (req, res, next) => {
  const id = req.params.id;

  const errors = getValidationResult(req);

  const properties = [['name']];

  const userInput = getUserInput(req, properties);

  if (errors) {
    throw getError(422, 'Invalid Input', errors);
  }

  // Find Mobile Cover Brand
  MobileCoverBrand.findByPk(id)
    .then(brand => {
      if (!brand) {
        throw getError(404, 'No Mobile Cover Brand Found');
      }

      for (const key in userInput) {
        brand[key] = userInput[key];
      }
      return brand.save();
    })
    .then(brand => {
      res.json({
        brand: mapMobileCoverBrand(brand)
      });
    })
    .catch(error => {
      next(error);
    });
};
