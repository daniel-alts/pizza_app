const requireAuth = require("../../../middlewares/requireAuth");
const setupDbForTesting = require("../../config/setupDb");

describe("requireAuth", () => {

  setupDbForTesting()

  let mockRequest;
  let mockResponse;
  let mockNext = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
        json: jest.fn(),
      })
    };
  })

  it("should throw an error if no authorization header is present", () => {
    requireAuth(mockRequest, mockResponse, () => {});
    const expectedResponse = { status: false, message: 'Unauthorized' };
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith(expectedResponse);
  });

  it("should throw an error if authorization header is only one string", () => {
    mockRequest.headers.authorization = "something"
    requireAuth(mockRequest, mockResponse, () => {});
    const expectedResponse = { status: false, message: 'Unauthorized' };
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith(expectedResponse);
  })

  it("should throw an error if authorization header is not of type Basic", () => {
    mockRequest.headers.authorization = "Bearer something"
    requireAuth(mockRequest, mockResponse, () => {});
    const expectedResponse = { status: false, message: 'Unauthorized' };
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith(expectedResponse);
  })

  it("should throw an error if user specified in basic auth does not exist", async () => {
    const username = "test";
    const password = "test";
    const base64 = Buffer.from(`${username}:${password}`).toString("base64");
    mockRequest.headers.authorization = "Basic " + base64
    await requireAuth(mockRequest, mockResponse, () => {});
    const expectedResponse = { status: false, message: 'Unauthorized' };
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith(expectedResponse);
  })
})