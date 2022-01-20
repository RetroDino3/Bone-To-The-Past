const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

const Dinosaur = db.define('dinosaur', {
  fossil: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  health: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Dinosaur
