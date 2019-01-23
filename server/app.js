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
const DesktopCalenderCategory = require('./models/desktopCalenderCategory');
const DesktopCalender = require('./models/desktopCalender');
const WallCalenderCategory = require('./models/wallCalenderCategory');
const WallCalender = require('./models/wallCalender');
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

// Importing Routers
const authRouter = require('./routes/auth');
const adminAuthRouter = require('./routes/admin/auth');
const mugCategoryRouter = require('./routes/admin/mugs/categories');
const mugRouter = require('./routes/admin/mugs/product');
const desktopCalenderCategoryRouter = require('./routes/admin/desktopCalender/categories');
const desktopCalenderRouter = require('./routes/admin/desktopCalender/product');
const wallCalenderCategoryRouter = require('./routes/admin/wallCalender/categories');
const wallCalenderRouter = require('./routes/admin/wallCalender/product');
const photoBookCategoryRouter = require('./routes/admin/photoBook/categories');
const photoBookRouter = require('./routes/admin/photoBook/product');
const mobileCoverBrandRouter = require('./routes/admin/mobileCover/brand');
const mobileCoverModelRouter = require('./routes/admin/mobileCover/model');
const mobileCoverRouter = require('./routes/admin/mobileCover/product');
const gallaryRouter = require('./routes/gallary');
const mugCartRouter = require('./routes/cart/mugCart');
const photoBookCartRouter = require('./routes/cart/photoBookCart');

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

// Setting up Routes
app.use('/api', authRouter);
app.use('/api/admin', adminAuthRouter);
app.use('/api/admin/mug/category', authenticator('admin'), mugCategoryRouter);
app.use('/api/admin/mug', authenticator('admin'), mugRouter);
app.use(
  '/api/admin/desktop-calender/category',
  authenticator('admin'),
  desktopCalenderCategoryRouter
);
app.use(
  '/api/admin/desktop-calender',
  authenticator('admin'),
  desktopCalenderRouter
);
app.use(
  '/api/admin/wall-calender/category',
  authenticator('admin'),
  wallCalenderCategoryRouter
);
app.use('/api/admin/wall-calender', authenticator('admin'), wallCalenderRouter);
app.use(
  '/api/admin/photo-book/category',
  authenticator('admin'),
  photoBookCategoryRouter
);
app.use('/api/admin/photo-book', authenticator('admin'), photoBookRouter);
app.use(
  '/api/admin/mobile-cover/brand',
  authenticator('admin'),
  mobileCoverBrandRouter
);
app.use(
  '/api/admin/mobile-cover/model',
  authenticator('admin'),
  mobileCoverModelRouter
);
app.use('/api/admin/mobile-cover', authenticator('admin'), mobileCoverRouter);
app.use('/api/gallary', authenticator(), gallaryRouter);
app.use('/api/cart/mug', authenticator(), mugCartRouter);
app.use('/api/cart/photo-book', authenticator(), photoBookCartRouter);

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
DesktopCalender.belongsTo(DesktopCalenderCategory, { onDelete: 'CASCADE' });
WallCalender.belongsTo(WallCalenderCategory, { onDelete: 'CASCADE' });
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
