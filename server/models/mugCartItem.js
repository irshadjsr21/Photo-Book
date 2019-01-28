const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MugCartItem = sequelize.define('mugCartItem', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    colour : {
        type: Sequelize.ENUM(['white', 'black']),
        allowNull: false
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

module.exports = MugCartItem;