const supertest = require("supertest");
const server = require("../index");

describe("register", () => {
    it("POST /register", async() => {
        const response = await supertest(server).post("/api/orders").send({
            action: "registration successful",
        });

        // console.log({response})
        expect("Content-Type", /json/).expect(200, done);
    });
});

describe("GET /user", function() {
    it("responds with json", function(done) {
        request(app)
            .get("/user")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

describe("GET /user", function() {
    it("responds with json", function(done) {
        request(app)
            .get("/user")
            .auth("username", "password")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});