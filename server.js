const express = require('express')
const app = express()
app.use('/static', express.static('build/static'))
app.use(express.static('build/dist'))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('server started at 3000')
})
