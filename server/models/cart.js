const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = Cart;