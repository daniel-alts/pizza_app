const supertest = require("supertest");
const app = require("../index");

describe("Testing API endpoints", () => {
  describe("Test for the Order Endpoints", () => {
    it("should return status:true", async () => {
      await supertest(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              status: true,
            })
          );
        });
    });
  });
});
