const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const WallCalendarCategory = sequelize.define('wallCalendarCategory', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = WallCalendarCategory;
