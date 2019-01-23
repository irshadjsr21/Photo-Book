const { map, mapAll } = require('./map');

// ********* Desktop Calender **************
module.exports.mapDesktopCalenderCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapDesktopCalender = calender => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['desktopCalenderCategoryId', 'categoryId']
  ];

  return map(calender, properties);
};

// ********* Wall Calender **************
module.exports.mapWallCalenderCategory = category => {
  const properties = [['id'], ['name'], ['createdAt'], ['updatedAt']];

  return map(category, properties);
};

module.exports.mapWallCalender = calender => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['wallCalenderCategoryId', 'categoryId']
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
