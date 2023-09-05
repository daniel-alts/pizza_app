const app = require('./index')
const Database = require('./database');
const Cache = require('./config/redis');

const PORT = process.env.PORT || 3000

// connect to database
Database.connect(process.env.MONGODB_CONNECTION_URL);

// connect to redis
Cache.connect()

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
