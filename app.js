const express = require("express");
const config = require("./config");
const router = require("./routes/index");
const db = require("./config/database");


const PORT = config.PORT || 7000;

const app = express();
app.use(express.json());

app.use(router);
app.get("/", (req, res) => {
    res.send("WELCOME TO PIZZA APP");
});

app.use((req, res,) => res.status(404).send({
    status: "error",
    error: "Not found",
    message: "Route not correct kindly check url.",
}));

(async () => {
    console.log("Waiting for DATABASE Connection...");
    await db.connect();
    app.listen(config.PORT || 4000, async () => {
        console.log(
            `${config.APP_NAME} API listening on ${PORT || 4000}`
        );
    });
})();