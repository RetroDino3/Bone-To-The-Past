//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Save = require('./models/Save')
const Stage = require('./models/Stage')
const Dinosaur = require('./models/Dinosaur')
const Item  = require('./models/Item')
const Inventory  = require('./models/Inventory')

//associations could go here!

User.hasMany(Save)
Save.belongsTo(User)

Save.belongsToMany(Stage)
Stage.belongsToMany(Save)

Stage.belongsToMany(Dinosaur)
Dinosaur.belongsToMany(Stage)

Save.belongsToMany(Item, { through: Inventory })
Item.belongsToMany(Save, { through: Inventory })

Dinosaur.belongsToMany(Item)
Item.belongsToMany(Dinosaur)

module.exports = {
  db,
  models: {
    User,
    Save,
    Stage,
    Dinosaur,
    Item,
    Inventory
  },
}
