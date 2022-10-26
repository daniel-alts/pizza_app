const app = require('./index')
const Database = require('./database');

// connect to database
Database.connect();

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
