const { config } = require('dotenv');
const app = require("./app");


require('dotenv').config()

const PORT = process.env.PORT || 3334


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})