const app = require('./index')
const Database = require('./database');

const PORT = process.env.PORT || 3334

// connect to database
Database.connect();

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
