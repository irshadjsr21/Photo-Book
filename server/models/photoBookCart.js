const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const PhotoBookCart = sequelize.define('photoBookCart', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = PhotoBookCart;