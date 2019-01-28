const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MugCart = sequelize.define('mugCart', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = MugCart;