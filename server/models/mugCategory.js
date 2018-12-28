const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MugCategory = sequelize.define('mugCategory', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = MugCategory;