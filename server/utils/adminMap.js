const { map, mapAll } = require('./map');

// ********* Desktop Calendar **************
module.exports.mapDesktopCalendarCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapDesktopCalendar = calender => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['desktopCalendarCategoryId', 'categoryId']
  ];

  return map(calender, properties);
};

// ********* Wall Calendar **************
module.exports.mapWallCalendarCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapWallCalendar = calender => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['wallCalendarCategoryId', 'categoryId']
  ];

  return map(calender, properties);
};

// ************* Mug **************
module.exports.mapMugCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapMug = mug => {
  const properties = [
    ['id'],
    ['name'],
    ['whitePrice'],
    ['blackPrice'],
    ['stock'],
    ['whiteOfferPrice'],
    ['blackOfferPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['mugCategoryId', 'categoryId']
  ];

  return map(mug, properties);
};

// ************* Photo Book **************
module.exports.mapPhotoBookCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapPhotoBook = photoBook => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['photoBookCategoryId', 'categoryId']
  ];

  return map(photoBook, properties);
};

// ************* Mobile Cover **************
module.exports.mapMobileCoverBrand = brand => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(brand, properties);
};

module.exports.mapMobileCoverModel = model => {
  const properties = [
    ['id'],
    ['name'],
    ['mobileCoverBrandId', 'brandId'],
    ['createdAt'],
    ['updatedAt']
  ];

  return map(model, properties);
};

module.exports.mapMobileCover = photoBook => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['mobileCoverModelId', 'modelId']
  ];

  return map(photoBook, properties);
};

module.exports.mapAll = mapAll;
