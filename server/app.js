// Importing Modules
const express = require('express');

// Importing Config File
const config = require('./utils/config');

// Importing Database Connection
const sequelize = require('./utils/database');

// Importing Models
const User = require('./models/user');
const Admin = require('./models/admin');

// Importing Routers
const routers = require('./routes/index');

// Importing Middlewares
const initialMiddlewares = require('./middlewares/initial');

// Getting port from process.env
const PORT = process.env.PORT || 3000;

// Initializing app
const app = express();

// Setting Middlewares
app.use(initialMiddlewares);

// Setting up Routes
app.use('/api', routers);

// Page not Found Error
app.use((req, res) => {
    res.status(404).json({
        msg: ['URL not found']
    });
});

// Server Error
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        msg: ['Some Internal Error Occured']
    });
});

// Connecting to Database
sequelize.sync()
    .then(() => {
        // Starting the server
        return Admin.findAll();
        
    })
    .then(admins => {
        if(admins.length === 0) {
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
    .catch((error) => {
        console.log(error);
    });
