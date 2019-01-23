module.exports.mapMugCartItem = input => {
    let mug;
    if(input.mugCartItem) {
        mug = input.mugCartItem;
    } else {
        mug = input;
    }
    return {
        id: mug.id,
        colour: mug.colour,
        quantity: mug.quantity,
        imageUrl: mug.imageUrl,
        mugId: mug.mugId,
        product: mug.product,
        createdAt: mug.createdAt,
        updatedAt: mug.updatedAt
    }
}

module.exports.mapMugCartItems = mugs => {
    const result = [];
    for(const mug of mugs) {
        result.push(module.exports.mapMugCartItem(mug));
    }
    return result;
}

module.exports.mapMug = mug => {
    return {
        id: mug.id,
        name: mug.name,
        whitePrice: mug.whitePrice,
        blackPrice: mug.blackPrice,
        imageUrl: mug.imageUrl,
        mugCategoryId: mug.mugCategoryId
    }
}

module.exports.mapPhotoBookCartItem = input => {
    let photoBook;
    if(input.photoBookCartItem) {
        photoBook = input.photoBookCartItem;
    } else {
        photoBook = input;
    }
    return {
        id: photoBook.id,
        quantity: photoBook.quantity,
        imageUrl: photoBook.imageUrl,
        photoBookId: photoBook.photoBookId,
        product: photoBook.product,
        createdAt: photoBook.createdAt,
        updatedAt: photoBook.updatedAt
    }
}

module.exports.mapPhotoBookCartItems = photoBooks => {
    const result = [];
    for(const photoBook of photoBooks) {
        result.push(module.exports.mapPhotoBookCartItem(photoBook));
    }
    return result;
}

module.exports.mapPhotoBook = photoBook => {
    return {
        id: photoBook.id,
        name: photoBook.name,
        whitePrice: photoBook.whitePrice,
        blackPrice: photoBook.blackPrice,
        imageUrl: photoBook.imageUrl,
        photoBookCategoryId: photoBook.photoBookCategoryId
    }
}