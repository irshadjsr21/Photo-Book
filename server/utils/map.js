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
        mug: mug.mug,
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