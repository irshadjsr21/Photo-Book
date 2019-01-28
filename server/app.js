// Importing Modules
const express = require('express');
const path = require('path');
const { getError } = require('./utils/helperFunctions');
const authenticator = require('./middlewares/authenticator');

// Importing Config File
const config = require('./utils/config');

// Importing Database Connection
const sequelize = require('./utils/database');

// Importing Models
const User = require('./models/user');
const Admin = require('./models/admin');
const Mug = require('./models/mug');
const MugCategory = require('./models/mugCategory');
const Gallary = require('./models/gallary');
const Address = require('./models/address');
const DesktopCalendarCategory = require('./models/desktopCalendarCategory');
const DesktopCalendar = require('./models/desktopCalendar');
const WallCalendarCategory = require('./models/wallCalendarCategory');
const WallCalendar = require('./models/wallCalendar');
const PhotoBookCategory = require('./models/photoBookCategory');
const PhotoBook = require('./models/photoBook');
const MobileCoverBrand = require('./models/mobileCoverBrand');
const MobileCoverModel = require('./models/mobileCoverModel');
const MobileCover = require('./models/mobileCover');
const Cart = require('./models/cart');
const MugCartItem = require('./models/mugCartItem');
const MugCart = require('./models/mugCart');
const PhotoBookCartItem = require('./models/photoBookCartItem');
const PhotoBookCart = require('./models/photoBookCart');

// Importing Middlewares
const initialMiddlewares = require('./middlewares/initial');

// Getting port from process.env
const PORT = process.env.PORT || 3000;

// Initializing app
const app = express();

// Setting Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting Middlewares
app.use(initialMiddlewares);

// *
// *
// *

// **********************************************
// ********** Importing Admin Routes ************
// **********************************************

// *
// *
// *

// **************** General *********************
const adminAuthRouter = require('./routes/admin/auth');

// ******************* Products ***********************
const adminMugCategoryRouter = require('./routes/admin/mugs/categories');
const adminMugRouter = require('./routes/admin/mugs/product');

const adminDesktopCalendarCategoryRouter = require('./routes/admin/desktopCalendar/categories');
const adminDesktopCalendarRouter = require('./routes/admin/desktopCalendar/product');

const adminWallCalendarCategoryRouter = require('./routes/admin/wallCalendar/categories');
const adminWallCalendarRouter = require('./routes/admin/wallCalendar/product');

const adminPhotoBookCategoryRouter = require('./routes/admin/photoBook/categories');
const adminPhotoBookRouter = require('./routes/admin/photoBook/product');

const adminMobileCoverBrandRouter = require('./routes/admin/mobileCover/brand');
const adminMobileCoverModelRouter = require('./routes/admin/mobileCover/model');
const adminMobileCoverRouter = require('./routes/admin/mobileCover/product');

// *
// *
// *

// **********************************************
// ********** Importing User Routes *************
// **********************************************

// *
// *
// *

const authRouter = require('./routes/auth');
const gallaryRouter = require('./routes/gallary');

// ***************** Cart ************************
const mugCartRouter = require('./routes/cart/mugCart');
const photoBookCartRouter = require('./routes/cart/photoBookCart');

// ***************** Products ************************
const mugRouter = require('./routes/products/mug');
const photoBookRouter = require('./routes/products/photoBook');
const desktopCalendarRouter = require('./routes/products/desktopCalendar');
const wallCalendarRouter = require('./routes/products/wallCalendar');
const mobileCoverRouter = require('./routes/products/mobileCover');

// *
// *
// *

// **********************************************
// ******** Setting Up Admin Routers ************
// **********************************************

// *
// *
// *

// *************** General **********************
app.use('/api/admin', adminAuthRouter);

// *************** Products *********************

// Mug
app.use(
  '/api/admin/mug/category',
  authenticator('admin'),
  adminMugCategoryRouter
);

app.use('/api/admin/mug', authenticator('admin'), adminMugRouter);

// Desktop Calendar
app.use(
  '/api/admin/desktop-calendar/category',
  authenticator('admin'),
  adminDesktopCalendarCategoryRouter
);

app.use(
  '/api/admin/desktop-calendar',
  authenticator('admin'),
  adminDesktopCalendarRouter
);

// Wall Calendar
app.use(
  '/api/admin/wall-calendar/category',
  authenticator('admin'),
  adminWallCalendarCategoryRouter
);

app.use(
  '/api/admin/wall-calendar',
  authenticator('admin'),
  adminWallCalendarRouter
);

// Photo Book
app.use(
  '/api/admin/photo-book/category',
  authenticator('admin'),
  adminPhotoBookCategoryRouter
);

app.use('/api/admin/photo-book', authenticator('admin'), adminPhotoBookRouter);

// Mobile Cover
app.use(
  '/api/admin/mobile-cover/brand',
  authenticator('admin'),
  adminMobileCoverBrandRouter
);

app.use(
  '/api/admin/mobile-cover/model',
  authenticator('admin'),
  adminMobileCoverModelRouter
);

app.use(
  '/api/admin/mobile-cover',
  authenticator('admin'),
  adminMobileCoverRouter
);

// *
// *
// *

// **********************************************
// ******** Setting Up User Routers *************
// **********************************************

// *
// *
// *

// ***************** General ********************
app.use('/api', authRouter);
app.use('/api/gallary', authenticator(), gallaryRouter);

// ***************** Cart ***********************
app.use('/api/cart/mug', authenticator(), mugCartRouter);
app.use('/api/cart/photo-book', authenticator(), photoBookCartRouter);

// ***************** Products *******************
app.use('/api/products/mug', authenticator(), mugRouter);
app.use('/api/products/photo-book', authenticator(), photoBookRouter);
app.use(
  '/api/products/desktop-calendar',
  authenticator(),
  desktopCalendarRouter
);
app.use('/api/products/wall-calendar', authenticator(), wallCalendarRouter);
app.use('/api/products/mobile-cover', authenticator(), mobileCoverRouter);

// Page not Found Error
app.use((req, res) => {
  if (res.headersSent) {
    return;
  }
  throw getError(404, 'URL not Found');
});

// Server Error
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  let response = {
    error: error.customError || 'Some Internal Error Occured'
  };
  if (!error.customError) {
    console.log(error);
  }
  if (error.msg) {
    response.msg = error.msg;
  }
  return res.status(status).json(response);
});

// Database Relations
Mug.belongsTo(MugCategory, { onDelete: 'CASCADE' });
DesktopCalendar.belongsTo(DesktopCalendarCategory, { onDelete: 'CASCADE' });
WallCalendar.belongsTo(WallCalendarCategory, { onDelete: 'CASCADE' });
PhotoBook.belongsTo(PhotoBookCategory, { onDelete: 'CASCADE' });
MobileCoverModel.belongsTo(MobileCoverBrand, { onDelete: 'CASCADE' });
MobileCover.belongsTo(MobileCoverModel, { onDelete: 'CASCADE' });
Gallary.belongsTo(User);
Address.hasOne(User, { foreignKey: 'deliveryAddressId' });
Address.hasOne(User, { foreignKey: 'billingAddressId' });

Cart.belongsTo(User);
MugCart.belongsTo(Cart);
PhotoBookCart.belongsTo(Cart);
MugCart.belongsToMany(Mug, { through: MugCartItem });
PhotoBookCart.belongsToMany(PhotoBook, { through: PhotoBookCartItem });

// Connecting to Database
sequelize
  .sync()
  .then(() => {
    // Starting the server
    return Admin.findAll();
  })
  .then(admins => {
    if (admins.length === 0) {
      const admin = new Admin({
        fullName: config.ADMIN.NAME,
        email: config.ADMIN.EMAIL,
        password: config.ADMIN.PASSWORD
      });
      return admin.save();
    }
    return;
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server Started on PORT : ' + PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });
