const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const DesktopCalendarCategory = sequelize.define('desktopCalendarCategory', {
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

module.exports = DesktopCalendarCategory;
