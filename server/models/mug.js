const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Mug = sequelize.define('mug', {
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
    whitePrice : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    blackPrice : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    color : {
        type: Sequelize.ENUM('white', 'black')
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Mug;