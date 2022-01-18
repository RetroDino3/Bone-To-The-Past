const router = require('express').Router()
const {
  models: { User, Save },
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get user's saves
router.get('/:id/saves', async (req, res, next) => {
  /* Protected: only verified User or Admin */
  // get all Save from User
  try {
    const saves = await Save.findAll({ where: { userId: req.params.id } })
    res.json(saves)
  } catch (err) {
    next(err)
  }
})
