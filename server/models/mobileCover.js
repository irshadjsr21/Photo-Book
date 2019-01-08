const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MobileCover = sequelize.define('mobileCover', {
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

module.exports = MobileCover;