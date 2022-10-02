const requireRole = require('../../../middlewares/requireRole');

describe("requireRole", () => {
  const mockRequest = {
    user: {}
  }
  const mockResponse = {
    status: jest.fn().mockReturnValue({
      json: jest.fn()
    })
  }
  const mockNext = jest.fn();

  it("should call next if user role is admin", () => {
    mockRequest.user.user_type = "admin";
    requireRole("admin")(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalled();
  })

  it("should call next if user role is user or admin", () => {
    mockRequest.user.user_type = "user";
    requireRole("user", "admin")(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalled();
  })

  it("should return 403 if user role is not admin", () => {
    mockRequest.user.user_type = "user";
    requireRole("admin")(mockRequest, mockResponse, mockNext);
    const expectedResponse = { status: false, error: 'Cannot access this resource' };
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.status().json).toHaveBeenCalledWith(expectedResponse);
  })
})