import jwt from "jsonwebtoken";
import authMiddleware from "./auth.middleware";
import UsersDao from "../users/users.dao";
import { IUser } from "../users/users.model";
import { AuthTokenPayload } from "../interfaces/authTokenPayload";
import { mockRequestWithUser } from "../testUtils/mockRequestWithUser";
import { mockResponse } from "../testUtils/mockResponse";
import { mockNext } from "../testUtils/mockNext";

describe("Auth Middleware", () => {
  test("should fail when Authorization header is not passed through", async () => {
    const req = mockRequestWithUser({ authHeader: null });
    const res = mockResponse();
    const next = mockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "No Authorization header passed. Please try authenticating again.",
    });
  });

  test("should fail when token from auth header is invalid or expired", async () => {
    const req = mockRequestWithUser({ authHeader: "Bearer invalid_token" });
    const res = mockResponse();
    const next = mockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token. Please try authenticating again.",
    });
  });

  test("should fail when no user with matching id from decoded token is found", async () => {
    const req = mockRequestWithUser({ authHeader: "Bearer valid_token" });
    const res = mockResponse();
    const next = mockNext();

    // Mock out decoded token from Authorization header
    const jwtSpy = (jest.spyOn(
      jwt,
      "verify"
    ) as jest.SpyInstance).mockImplementation(
      () => ({ username: "user", id: "user_id" } as AuthTokenPayload)
    );

    // Mock out no matching user
    const findUserByIdSpy = (jest.spyOn(
      UsersDao,
      "findUserById"
    ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "No user matched the token. Please try authenticating again.",
    });

    jwtSpy.mockRestore();
    findUserByIdSpy.mockRestore();
  });

  test("should fail when unable to tell if there is user with matching id from decoded token", async () => {
    const req = mockRequestWithUser({ authHeader: "Bearer valid_token" });
    const res = mockResponse();
    const next = mockNext();

    // Mock out decoded token from Authorization header
    const jwtSpy = (jest.spyOn(
      jwt,
      "verify"
    ) as jest.SpyInstance).mockImplementation(
      () => ({ username: "user", id: "user_id" } as AuthTokenPayload)
    );

    // Mock out failing to determine a matching user
    const findUserByIdSpy = (jest.spyOn(
      UsersDao,
      "findUserById"
    ) as jest.SpyInstance).mockImplementation(() =>
      Promise.reject("Failed to determine if user is matching the token id.")
    );

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Failed to determine if user matched the token. Please try authenticating again.",
    });

    jwtSpy.mockRestore();
    findUserByIdSpy.mockRestore();
  });

  test("should successfully authenticate for matching user from decoded token", async () => {
    const req = mockRequestWithUser({ authHeader: "Bearer valid_token" });
    const res = mockResponse();
    const next = mockNext();

    // Mock out decoded token from Authorization header
    const jwtSpy = (jest.spyOn(
      jwt,
      "verify"
    ) as jest.SpyInstance).mockImplementation(
      () => ({ username: "user", id: "user_id" } as AuthTokenPayload)
    );

    // Mock out matching user
    const user: IUser = {
      username: "user",
      email: "user@test.com",
      password: "testing123",
    };
    const findUserByIdSpy = (jest.spyOn(
      UsersDao,
      "findUserById"
    ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(user));

    await authMiddleware(req, res, next);

    expect(req.user).toMatchObject(user);
    expect(next).toHaveBeenCalled();

    jwtSpy.mockRestore();
    findUserByIdSpy.mockRestore();
  });
});
