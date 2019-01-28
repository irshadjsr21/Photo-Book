const WallCalendar = require('../../models/wallCalendar');
const WallCalendarCategory = require('../../models/wallCalendarCategory');

const { getQuery } = require('../../utils/helperFunctions');
const {
  mapWallCalendar,
  mapWallCalendarCategory,
  mapAll
} = require('../../utils/map');

// Get Wall Calendar Category
module.exports.getWallCalendarCategory = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  WallCalendarCategory.findAll({ where: options })
    .then(categories => {
      return res.status(200).json({
        categories: mapAll(categories, mapWallCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Wall Calendar
module.exports.getWallCalendar = (req, res, next) => {
  const properties = [['id'], ['category', 'wallCalendarCategoryId']];

  const options = getQuery(req, properties);

  WallCalendar.findAll({ where: options })
    .then(wallCalendars => {
      res.status(200).json({
        wallCalendars: mapAll(wallCalendars, mapWallCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};
