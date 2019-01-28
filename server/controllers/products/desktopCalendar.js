const DesktopCalendar = require('../../models/desktopCalendar');
const DesktopCalendarCategory = require('../../models/desktopCalendarCategory');

const { getQuery } = require('../../utils/helperFunctions');
const {
  mapDesktopCalendar,
  mapDesktopCalendarCategory,
  mapAll
} = require('../../utils/map');

// Get Photo Book Category
module.exports.getDesktopCalendarCategory = (req, res, next) => {
  const properties = [['id']];

  const options = getQuery(req, properties);

  DesktopCalendarCategory.findAll({ where: options })
    .then(categories => {
      return res.status(200).json({
        categories: mapAll(categories, mapDesktopCalendarCategory)
      });
    })
    .catch(error => {
      next(error);
    });
};

// Get Photo Book
module.exports.getDesktopCalendar = (req, res, next) => {
  const properties = [['id'], ['category', 'desktopCalendarCategoryId']];

  const options = getQuery(req, properties);

  DesktopCalendar.findAll({ where: options })
    .then(desktopCalendars => {
      res.status(200).json({
        desktopCalendars: mapAll(desktopCalendars, mapDesktopCalendar)
      });
    })
    .catch(error => {
      next(error);
    });
};
