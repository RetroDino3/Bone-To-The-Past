const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Inventory
