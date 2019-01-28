// ******* Master Maping Functions **********
module.exports.map = (item, properties) => {
  const result = {};

  for (const property of properties) {
    let key = property[1] || property[0];
    result[key] = item[property[0]];
  }

  return result;
};

module.exports.mapAll = (items, mapFunction) => {
  const result = [];
  for (const item of items) {
    result.push(mapFunction(item));
  }
  return result;
};

// ***************************************
// ************ Products *****************
// ***************************************

// **************** Mug *******************
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
    ['mugCategoryId', 'categoryId']
  ];

  return module.exports.map(mug, properties);
};

module.exports.mapMugCategory = category => {
  const properties = [['id'], ['name']];

  return module.exports.map(category, properties);
};

// ************** Photo Book *****************
module.exports.mapPhotoBook = photoBook => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['photoBookCategoryId', 'categoryId']
  ];

  return module.exports.map(photoBook, properties);
};

// ************** Desktop Calendar *****************
module.exports.mapDesktopCalendar = desktopCalendar => {
  const properties = [
    ['id'],
    ['name'],
    ['price'],
    ['stock'],
    ['offerPrice'],
    ['imageUrl'],
    ['desktopCalendarCategoryId', 'categoryId']
  ];

  return module.exports.map(desktopCalendar, properties);
};

module.exports.mapDesktopCalendarCategory = category => {
  const properties = [['id'], ['name']];

  return module.exports.map(category, properties);
};

// ***************************************
// ************ Cart Items ***************
// ***************************************

// **************** Mug *******************
module.exports.mapMugCartItem = input => {
  let mug;
  const properties = [
    ['id'],
    ['colour'],
    ['quantity'],
    ['product'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['mugId']
  ];

  if (input.mugCartItem) {
    mug = input.mugCartItem;
  } else {
    mug = input;
  }

  return module.exports.map(mug, properties);
};

// *************** Photo Book ******************
module.exports.mapPhotoBookCartItem = input => {
  let photoBook;
  const properties = [
    ['id'],
    ['quantity'],
    ['product'],
    ['imageUrl'],
    ['createdAt'],
    ['updatedAt'],
    ['photoBookId']
  ];

  if (input.photoBookCartItem) {
    photoBook = input.photoBookCartItem;
  } else {
    photoBook = input;
  }
  return module.exports.map(input, properties);
};
