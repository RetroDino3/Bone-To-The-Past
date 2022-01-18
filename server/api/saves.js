const router = require('express').Router()
const {
  models: { Save, User },
} = require('../db')
module.exports = router

// mounted at /api/saves
router.get('/', async (req, res, next) => {
  /* Protected: only Admin */
  // get all Save from all User
  try {
    const saves = await Save.findAll()
    res.json(saves)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  /* Protected: only verified User or Admin */
  // get one Save
  try {
    const save = await Save.findByPk(req.params.id)
    res.json(save)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  /* Protected: only verified User or Admin */
  try {
    const save = await Save.create()
    const user = await User.findByPk(req.body.userId)
    await user.addSave(save)
    res.json(save)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  /* Protected: only verified User or Admin */
  try {
    const save = await Save.findByPk(req.params.id)
    await save.update(req.body)
    res.json(save)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  /* Protected: only verified User or Admin */
  try {
    const save = await Save.findByPk(req.params.id)
    await save.destroy()
    res.json(save)
  } catch (err) {
    next(err)
  }
})
