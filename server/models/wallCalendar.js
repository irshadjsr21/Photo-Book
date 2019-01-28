const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const WallCalendar = sequelize.define('wallCalendar', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  offerPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = WallCalendar;
