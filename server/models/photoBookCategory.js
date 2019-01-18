const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const PhotoBookCategory = sequelize.define('photoBookCategory', {
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

module.exports = PhotoBookCategory;