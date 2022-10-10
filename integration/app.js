const supertest = require("supertest");
const server = require("../index");

describe("Calculate", () => {
    it("POST /calculate: action: sum", async() => {
        const response = await supertest(server).post("/api/orders").send({
            action: "sum",
            num1: 20,
            num2: 10,
        });

        // console.log({response})
        expect(response.status).toBe(200);
        expect(response.text).toBe(JSON.stringify({ result: 30 }));
    });
});