const database = require("./database")

const setupDbForTesting = () => {
  beforeAll((done) => {
    database.connect(done)
  })

  afterAll((done) => {
    database.clear()
    database.close(done)
  })
}

module.exports = setupDbForTesting