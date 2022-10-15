const app = require('./index');
const mongoose = require('mongoose');

const PORT = 3334;

mongoose.connect(process.env.DB_URL);

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
