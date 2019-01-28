const MobileCover = require('../../models/mobileCover');
const MobileCoverBrand = require('../../models/mobileCoverBrand');
const MobileCoverModel = require('../../models/mobileCoverModel');

const { getQuery } = require('../../utils/helperFunctions');
const {
  mapMobileCover,
  mapMobileCoverBrand,
  mapMobileCoverModel,
  mapAll
} = require('../../utils/map');

// Get Mobile Cover Brand
module.exports.getMobileCoverBrand = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  MobileCoverBrand.findAll({ where: options })
    .then(brands => {
      return res.status(200).json({
        brands: mapAll(brands, mapMobileCoverBrand)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Mobile Cover Model
module.exports.getMobileCoverModel = (req, res, next) => {
  const properties = [['id'], ['brand', 'mobileCoverBrandId']];

  const options = getQuery(req, properties);

  MobileCoverModel.findAll({ where: options })
    .then(models => {
      res.status(200).json({
        models: mapAll(models, mapMobileCoverModel)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Mobile Cover
module.exports.getMobileCover = (req, res, next) => {
  const properties = [['id'], ['model', 'mobileCoverModelId']];

  const options = getQuery(req, properties);

  MobileCover.findAll({ where: options })
    .then(mobileCovers => {
      res.status(200).json({
        mobileCovers: mapAll(mobileCovers, mapMobileCover)
      });
    })
    .catch(error => {
      next(error);
    });
};
