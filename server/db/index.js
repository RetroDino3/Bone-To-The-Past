//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Save = require('./models/Save')
const Stage = require('./models/Stage')
const Dinosaur = require('./models/Dinosaur')
const Item = require('./models/Item')
const Inventory = require('./models/Inventory')

//associations could go here!

User.hasMany(Save)
Save.belongsTo(User)

Save.belongsToMany(Stage, { through: 'SaveStage' })
Stage.belongsToMany(Save, { through: 'SaveStage' })

Stage.belongsToMany(Dinosaur, { through: 'StageDinosaur' })
Dinosaur.belongsToMany(Stage, { through: 'StageDinosaur' })

Save.belongsToMany(Item, { through: Inventory })
Item.belongsToMany(Save, { through: Inventory })

Dinosaur.belongsToMany(Item, { through: 'DinosaurItem' })
Item.belongsToMany(Dinosaur, { through: 'DinosaurItem' })

module.exports = {
  db,
  models: {
    User,
    Save,
    Stage,
    Dinosaur,
    Item,
    Inventory,
  },
}
