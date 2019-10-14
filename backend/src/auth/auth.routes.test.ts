import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { AuthTokenPayload } from "../interfaces/authTokenPayload";
import { SignupUser, UserCredentials } from "./auth.controller";
import UsersDao from "../users/users.dao";
import UsersModel, { IUser } from "../users/users.model";
import DbTestHelper from "../testUtils/dbTestHelper";

const dbTestHelper = new DbTestHelper();
process.env.JWT_SECRET = "someJwtSecret";

describe("Auth Routes", () => {
  beforeAll(async () => {
    await dbTestHelper.startDb();
  });

  const existingUser: IUser = {
    username: "existinguser",
    email: "existingemail@test.com",
    password: "existingpassword123",
  };
  let existingUserModel;
  beforeEach(async () => {
    const hashedExistingUserPassword = await UsersModel.hashPassword(
      existingUser.password
    );
    existingUserModel = await UsersDao.createUser({
      ...existingUser,
      password: hashedExistingUserPassword,
    });
  });

  const signupEndpoint = "/auth/signup";
  describe(`${signupEndpoint}`, () => {
    test("should fail to sign up user with validation errors", () => {
      // TODO: implement this once validation logic is in
      expect(true).toBe(true);
    });

    test("should fail to sign up user if username already exists", async () => {
      const signupUser: SignupUser = existingUser;

      await request(app)
        .post(signupEndpoint)
        .send(signupUser)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({
            message: "Username is already taken.",
          });
        });
    });

    test("should fail to sign up user if email already exists", async () => {
      const signupUser: SignupUser = {
        username: "differentusername",
        email: existingUser.email,
        password: existingUser.password,
      };

      await request(app)
        .post(signupEndpoint)
        .send(signupUser)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({
            message: "Email is already taken.",
          });
        });
    });

    test("should be able to sign up a new user", async () => {
      const signupUser: SignupUser = {
        username: "newuser",
        email: "newemail@test.com",
        password: "newpassword123",
      };

      await request(app)
        .post(signupEndpoint)
        .send(signupUser)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty("token");

          const token = response.body.token;
          const decodedTokenPayload = jwt.verify(
            token,
            process.env.JWT_SECRET
          ) as AuthTokenPayload;
          const { username } = decodedTokenPayload;

          expect(username).toBe(signupUser.username);
        });
    });
  });

  const loginEndpoint = "/auth/login";
  describe(`${loginEndpoint}`, () => {
    test("should fail to login user with validation errors", () => {
      // TODO: implement this once validation logic is in
      expect(true).toBe(true);
    });

    test("should fail to login user if the username does not exist", async () => {
      const userCredentials: UserCredentials = {
        username: "doesnotexist",
        password: "doesnotexist123",
      };

      await request(app)
        .post(loginEndpoint)
        .send(userCredentials)
        .expect(401)
        .then(response => {
          expect(response.body).toMatchObject({
            message: "Username not found.",
          });
        });
    });

    test("should fail to login user if the password does not match", async () => {
      const userCredentials: UserCredentials = {
        username: existingUser.username,
        password: "wrongpassword123",
      };

      await request(app)
        .post(loginEndpoint)
        .send(userCredentials)
        .expect(401)
        .then(response => {
          expect(response.body).toMatchObject({
            message: "Passwords do not match.",
          });
        });
    });

    test("should be able to login a user with matching credentials", async () => {
      const userCredentials: UserCredentials = {
        username: existingUser.username,
        password: existingUser.password,
      };

      await request(app)
        .post(loginEndpoint)
        .send(userCredentials)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty("token");

          const token = response.body.token;
          const decodedTokenPayload = jwt.verify(
            token,
            process.env.JWT_SECRET
          ) as AuthTokenPayload;
          const { username } = decodedTokenPayload;

          expect(username).toBe(existingUser.username);
        });
    });
  });

  afterEach(async () => {
    await dbTestHelper.cleanUpDb();
  });

  afterAll(async () => {
    await dbTestHelper.stopDb();
  });
});
