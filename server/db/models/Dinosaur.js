const Sequelize = require('sequelize')
const db = require('../db')

const Dinosaur = db.define('dinosaur', {
  health: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Dinosaur
