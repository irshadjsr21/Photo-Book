const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Address = sequelize.define('address', {
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
    address1 : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address2 : {
        type: Sequelize.STRING,
        allowNull: false
    },
    city : {
        type: Sequelize.STRING,
        allowNull: false
    },
    state : {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Address;