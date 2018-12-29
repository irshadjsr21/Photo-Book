const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const { encryptPass, checkPassword } = require('../utils/helperFunctions');

const User = sequelize.define('user', {
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
    },
    mobile: {
        type: Sequelize.STRING
    }
});

User.beforeCreate(encryptPass);
User.beforeUpdate(encryptPass);

User.prototype.checkPassword = checkPassword;

module.exports = User;