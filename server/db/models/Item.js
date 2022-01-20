const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['ATK', 'REC', 'FOS'],
  },
  attack: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  heal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
})

module.exports = Item
