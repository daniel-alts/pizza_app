const { compareAgainstSchema } = require("../../../utils")

describe("Compare against schema", () => {
  it("should do a shallow compare", () => {
    const schema = {
      a: "string",
      b: "number",
      c: "boolean",
    }
    const got = {
      a: "hello",
      b: 123,
      c: true,
    }
    const result = compareAgainstSchema(got, schema)
    expect(result).toBe(true)
  })

  it("should do a deep compare", () => {
    const schema = {
      a: "string",
      b: {
        c: "number",
        d: {
          e: "boolean",
          f: {
            g: "string",
          }
        }
      }
    }
    const got = {
      a: "hello",
      b: {
        c: 123,
        d: {
          e: true,
          f: {
            g: "world",
          }
        }
      }
    }
    const result = compareAgainstSchema(got, schema)
    expect(result).toBe(true)
  })

  it("should do a deep compare with arrays", () => {
    const schema = {
      a: [{
        b: "string",
        d: [{ e: "number" }]
      }]
    }
    const got = {
      a: [{
        b: "hello",
        d: [{ e: 123 }]
      },{
        b: "world",
        d: [{ e: 456 }]
      }]
    }
    const result = compareAgainstSchema(got, schema)
    expect(result).toBe(true)
  })
})