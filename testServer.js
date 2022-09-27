const app = require("./index");

const TEST_PORT = 8080;
const HOST = "127.0.0.1";

app.listen(TEST_PORT, HOST, () => {
  console.log(`Listening on test port, ${TEST_PORT}`);
});
