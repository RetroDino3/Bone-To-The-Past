const Sequelize = require('sequelize')
const db = require('../db')

const Stage = db.define('stage', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Stage
