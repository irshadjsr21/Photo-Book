const Mug = require('../../models/mug');
const MugCategory = require('../../models/mugCategory');

const { getQuery } = require('../../utils/helperFunctions');
const { mapMug, mapMugCategory, mapAll } = require('../../utils/map');

// Get Mug Category
module.exports.getMugCategory = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  MugCategory.findAll({ where: options })
    .then(categories => {
      return res.status(200).json({
        categories: mapAll(categories, mapMugCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Mug
module.exports.getMug = (req, res, next) => {
  const properties = [['id'], ['category', 'mugCategoryId']];

  const options = getQuery(req, properties);

  Mug.findAll({ where: options })
    .then(mugs => {
      res.status(200).json({
        mugs: mapAll(mugs, mapMug)
      });
    })
    .catch(error => {
      next(error);
    });
};
