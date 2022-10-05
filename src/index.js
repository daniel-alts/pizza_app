const express = require('express');
const moment = require('moment');

require('dotenv').config();
const PORT = 3334 || process.env.PORT;
const { connectToDatabase } = require('./config/mongoose');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.headers);
  return res.json({ status: true });
});
app.use('/api', require('./routes/routes'));

connectToDatabase();

module.exports = app.listen(PORT, () => {
  console.log('Listening on port, ', PORT);
});
