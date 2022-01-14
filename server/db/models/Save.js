const Sequelize = require('sequelize')
const db = require('../db')

const Save = db.define('save', {
  playerHealth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
      min: 0
    }
  }
})

module.exports = Save
