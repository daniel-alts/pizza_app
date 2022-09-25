const express = require('express')
const Test = require('./routes/orders')

const app = express()

app.use('/', Test)

const PORT = 4565
app.listen(PORT, () => {
  console.log('Server is on')
})
