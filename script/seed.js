'use strict'

const {
  db,
  models: { User, Save, Stage, Dinosaur, Item },
} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'p1', password: '123' }),
  ])
  // Creating Saves
  const saves = await Promise.all([
    Save.create({ playerHealth: 99 }),
    Save.create({ playerHealth: 100 }),
    Save.create({ playerHealth: 150 }),
    Save.create({ playerHealth: 200 }),
  ])
  // Creating Stages
  const stages = await Promise.all([
    Stage.create({ name: 'stage-1' }),
    Stage.create({ name: 'stage-2' }),
    Stage.create({ name: 'stage-3' }),
    Stage.create({ name: 'stage-4' }),
  ])
  // Creating Items
  const items = await Promise.all([
    Item.create({ name: 'meat', type: 'REC', heal: 10 }),
    Item.create({ name: 'egg', type: 'REC', heal: 5 }),
    Item.create({ name: 'bone', type: 'ATK', attack: 5 }),
    Item.create({ name: 'staff', type: 'ATK', attack: 10 }),
    Item.create({ name: 'pocketknife', type: 'ATK', attack: 1 }),
    Item.create({ name: 'velociraptor fossil', type: 'FOS' }),
    Item.create({ name: 'aquilops fossil', type: 'FOS' }),
    Item.create({ name: 'dilong fossil', type: 'FOS' }),
    Item.create({ name: 'ibermesornis fossil', type: 'FOS' }),
  ])
  // Creating Dinosaurs
  const dinosaurs = await Promise.all([
    Dinosaur.create({
      name: 'velociraptor',
      health: 3,
      fossil: items[5].id,
      level: 0,
    }),
    Dinosaur.create({
      name: 'aquilops',
      health: 4,
      fossil: items[6].id,
      level: 0,
    }),
    Dinosaur.create({
      name: 'dilong',
      health: 10,
      fossil: items[7].id,
      level: 0,
    }),
    Dinosaur.create({
      name: 'ibermesornis',
      health: 10,
      fossil: items[8].id,
      level: 0,
    }),
  ])
  // Creating Inventories
  await saves[0].createInventory(items[0].id, 3)
  await saves[0].createInventory(items[2].id, 20)
  await saves[0].createInventory(items[4].id, 1)

  await saves[1].createInventory(items[0].id, 15)
  await saves[1].createInventory(items[2].id, 9)
  await saves[1].createInventory(items[4].id, 1)

  await saves[2].createInventory(items[0].id, 58)
  await saves[2].createInventory(items[2].id, 33)
  await saves[2].createInventory(items[4].id, 1)

  await saves[3].createInventory(items[0].id, 9)
  await saves[3].createInventory(items[2].id, 7)
  await saves[3].createInventory(items[4].id, 1)
  await saves[3].createInventory(items[5].id, 1)

  // add saves to a user
  await users[0].addSave(saves[0])
  await users[0].addSave(saves[3])
  await users[1].addSave(saves[1])
  await users[2].addSave(saves[2])
  // add stages to a save
  await saves[0].addStage(stages[0])
  await saves[1].addStage(stages[1])
  await saves[2].addStage(stages[2])
  await saves[2].addStage(stages[3])
  // add dinosaurs to a stage
  await stages[0].addDinosaur(dinosaurs[0])
  await stages[1].addDinosaur(dinosaurs[1])
  await stages[1].addDinosaur(dinosaurs[3])
  await stages[2].addDinosaur(dinosaurs[2])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${saves.length} saves`)
  console.log(`seeded ${stages.length} stages`)
  console.log(`seeded ${dinosaurs.length} dinosaurs`)
  console.log(`seeded ${items.length} items`)
  console.log(`added saves to users`)
  console.log(`added stages to saves`)
  console.log(`added items to saves`)
  console.log(`added dinosaurs to stages`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      p1: users[2],
    },
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
