const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Gallary = sequelize.define('gallary', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Gallary;