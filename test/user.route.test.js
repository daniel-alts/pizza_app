const request = require("supertest")
const baseURL = "http://localhost:3334"



describe("Users Route", () => {

      it("GET /users works", async () => {
        const response = await request(baseURL).get("/user");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Users gotten");
      });

      it("GET /users by id works", async () => {
        const response = await request(baseURL).get("/user/6331cd9fa642090e27c350bc")
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data.username).toBe("saheed123");
    })
    const newUser = {
      username: "saheed",
      password: "qwerty1234",
      user_type: "user",
    }
    it("POST /user works", async () => {
      const newUser = {
        username: "saheed",
        password: "qwerty1234",
        user_type: "admin",
      }

      const response = await request(baseURL).post("/user").send(newUser)
      expect(response.status).toBe(201)
      expect(response.body.data.username).toBe("saheed")
      expect(response.body.data.password).toBe("qwerty1234")
      expect(response.body.message).toBe("User added")
      })

    it("PATCH /user works", async () => {

      const newUser = {
        username: "saheed1",
        password: "qwerty1234",
        user_type: "user",
      }
      const response = await request(baseURL).patch("/user/633228e928442572c3dea5a2").send(newUser)
      expect(response.status).toBe(201)
      expect(response.body.data.username).toBe("saheed1")
      expect(response.body.data.password).toBe("qwerty1234")
      expect(response.body.message).toBe("User updated")
      })

    it("Delete /user works", async () => {
      const response = await request(baseURL).delete("/user/633346aaeca8478ba5de8293")
      expect(response.status).toBe(201)
      expect(response.body.data.username).toBe("saheed")
      expect(response.body.data.password).toBe("qwerty1234")
      expect(response.body.message).toBe("User deleted")
  })

    })