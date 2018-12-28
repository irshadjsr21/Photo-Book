const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const { encryptPass, checkPassword } = require('../utils/helperFunctions');

const Admin = sequelize.define('admin', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName : {
        type: Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Admin.beforeCreate(encryptPass);
Admin.beforeUpdate(encryptPass);

Admin.prototype.checkPassword = checkPassword;

module.exports = Admin;