const app = require('./app')


// **************** START SERVER ****************/

const PORT = 3334;
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})