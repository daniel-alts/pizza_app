const express = require('express');
const dbConnection = require('./controller/dbController');
const authRoutes = require('./routes/authRoutes')


const PORT = 3334

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ status: true });
});

app.use(authRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
});