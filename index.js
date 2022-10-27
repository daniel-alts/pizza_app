const express = require('express');
const dbConnection = require('./middleware/db');
const authRouter = require('./routes/authRoutes');
const orderRouter = require('./routes/orderRoutes');


const PORT = 3334

const app = express();

app.use(express.json());

dbConnection();

require('./passport')

app.use(authRouter);
app.use(orderRouter);

app.get('/', (req, res) => {
    return res.json({ status: true });
});

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found'})
})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
});