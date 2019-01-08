const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const PhotoBook = sequelize.define('photoBook', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    price : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = PhotoBook;