const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MobileCoverModel = sequelize.define('mobileCoverModel', {
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

module.exports = MobileCoverModel;