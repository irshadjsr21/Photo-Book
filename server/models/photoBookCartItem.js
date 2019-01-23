const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const PhotoBookCartItem = sequelize.define('photoBookCartItem', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    }
});

module.exports = PhotoBookCartItem;