const app = require('./index')
const {connectToMongo} = require('./database')

connectToMongo();

const PORT = 3334

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})