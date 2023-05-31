const app = require('./index')
const Database = require('./database');
const Cache = require('./config/redis');

const PORT = process.env.PORT || 3334

// connect to database
Database.connect();

// connect to redis
Cache.connect()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
