const DesktopCalender = require('../../models/desktopCalender');
const DesktopCalenderCategory = require('../../models/desktopCalenderCategory');

const { getQuery } = require('../../utils/helperFunctions');
const {
  mapDesktopCalender,
  mapDesktopCalenderCategory,
  mapAll
} = require('../../utils/map');

// Get Photo Book Category
module.exports.getDesktopCalenderCategory = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  DesktopCalenderCategory.findAll({ where: options })
    .then(categories => {
      return res.status(200).json({
        categories: mapAll(categories, mapDesktopCalenderCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Photo Book
module.exports.getDesktopCalender = (req, res, next) => {
  const properties = [['id'], ['category', 'desktopCalenderCategoryId']];

  const options = getQuery(req, properties);

  DesktopCalender.findAll({ where: options })
    .then(desktopCalenders => {
      res.status(200).json({
        desktopCalenders: mapAll(desktopCalenders, mapDesktopCalender)
      });
    })
    .catch(error => {
      next(error);
    });
};
