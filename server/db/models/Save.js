const Sequelize = require('sequelize')
const db = require('../db')
const Inventory = require('./Inventory')

const Save = db.define('save', {
  playerHealth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
      min: 0,
    },
  },
})

module.exports = Save

/**
 * instanceMethods
 */

Save.prototype.createInventory = async function (itemId, quantity) {
  try {
    const inventory = await Inventory.create({
      saveId: this.id,
      itemId,
      quantity,
    })
    return inventory
  } catch (err) {
    console.error(err)
  }
}

Save.prototype.updateInventory = async function (itemId, quantity) {
  try {
    const [inventoryItem] = await Inventory.findAll({
      where: {
        itemId,
        saveId: this.id,
      },
    })
    await inventoryItem.update({ quantity })
    return inventoryItem
  } catch (err) {
    console.error(err)
  }
}
