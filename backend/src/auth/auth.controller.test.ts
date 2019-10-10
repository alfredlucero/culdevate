import jwt from "jsonwebtoken";
import AuthController from "./auth.controller";
import UsersDao from "../users/users.dao";
import { mockRequest } from "../testUtils/mockRequest";
import { mockResponse } from "../testUtils/mockResponse";

describe("Auth Controller", () => {
  describe("Signup Controller", () => {
    test("should return bad request if username already exists", async () => {
      const req = mockRequest({
        body: {
          username: "usernameAlreadyExists",
          email: "user@test.com",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve({}));

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username is already taken.",
      });

      findUserByUsernameSpy.mockRestore();
    });

    test("should return internal server error if failed to determine if username already exists", async () => {
      const req = mockRequest({
        body: {
          username: "cantDetermineIfUsernameExists",
          email: "user@test.com",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("Failed to determine if username exists.")
      );

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to determine if username is already taken.",
      });

      findUserByUsernameSpy.mockRestore();
    });

    test("should return bad request if new username but email already exists", async () => {
      const req = mockRequest({
        body: {
          username: "user",
          email: "emailAlreadyExists",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const findUserByEmailSpy = (jest.spyOn(
        UsersDao,
        "findUserByEmail"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve({}));

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email is already taken.",
      });

      findUserByUsernameSpy.mockRestore();
      findUserByEmailSpy.mockRestore();
    });

    test("should return internal server error if new username but cannot tell if email already exists", async () => {
      const req = mockRequest({
        body: {
          username: "user",
          email: "cantTellIfEmailAlreadyExists",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const findUserByEmailSpy = (jest.spyOn(
        UsersDao,
        "findUserByEmail"
      ) as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("Cannot tell if email already exists")
      );

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to determine if email is already taken.",
      });

      findUserByUsernameSpy.mockRestore();
      findUserByEmailSpy.mockRestore();
    });

    test("should return internal server error if new username and email but failed to create user", async () => {
      const req = mockRequest({
        body: {
          username: "user",
          email: "cantTellIfEmailAlreadyExists",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const findUserByEmailSpy = (jest.spyOn(
        UsersDao,
        "findUserByEmail"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const createUserSpy = (jest.spyOn(
        UsersDao,
        "createUser"
      ) as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("Failed to create user")
      );

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to create user.",
      });

      findUserByUsernameSpy.mockRestore();
      findUserByEmailSpy.mockRestore();
      createUserSpy.mockRestore();
    });

    test("should return internal server error if new username, email, and saved user but failed to sign JWT", async () => {
      const req = mockRequest({
        body: {
          username: "user",
          email: "cantTellIfEmailAlreadyExists",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const findUserByEmailSpy = (jest.spyOn(
        UsersDao,
        "findUserByEmail"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const createUserSpy = (jest.spyOn(
        UsersDao,
        "createUser"
      ) as jest.SpyInstance).mockImplementation(() =>
        Promise.resolve({ _id: "1234", username: "user" })
      );
      const jwtSpy = (jest.spyOn(
        jwt,
        "sign"
      ) as jest.SpyInstance).mockImplementation((payload, secret, callback) => {
        callback(true, null);
      });

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to sign and generate JWT.",
      });

      findUserByUsernameSpy.mockRestore();
      findUserByEmailSpy.mockRestore();
      createUserSpy.mockRestore();
      jwtSpy.mockRestore();
    });

    test("should return token on success given new username, email, saved user, and signed JWT", async () => {
      const req = mockRequest({
        body: {
          username: "user",
          email: "cantTellIfEmailAlreadyExists",
          password: "testing123",
        },
      });
      const res = mockResponse();
      const findUserByUsernameSpy = (jest.spyOn(
        UsersDao,
        "findUserByUsername"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const findUserByEmailSpy = (jest.spyOn(
        UsersDao,
        "findUserByEmail"
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));
      const createUserSpy = (jest.spyOn(
        UsersDao,
        "createUser"
      ) as jest.SpyInstance).mockImplementation(() =>
        Promise.resolve({ _id: "1234", username: "user" })
      );
      const token = "jwt_token";
      const jwtSpy = (jest.spyOn(
        jwt,
        "sign"
      ) as jest.SpyInstance).mockImplementation((payload, secret, callback) => {
        callback(false, token);
      });

      await AuthController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token,
      });

      findUserByUsernameSpy.mockRestore();
      findUserByEmailSpy.mockRestore();
      createUserSpy.mockRestore();
      jwtSpy.mockRestore();
    });
  });

  // describe("Login Controller", () => {})
});
