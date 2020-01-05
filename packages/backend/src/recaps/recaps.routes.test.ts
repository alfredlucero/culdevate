import request from "supertest";
import app from "../app";
import UsersDao from "../users/users.dao";
import UsersModel, { User } from "../users/users.model";
import { UserCredentials } from "../auth/auth.controller";
import DbTestHelper from "../testUtils/dbTestHelper";

const dbTestHelper = new DbTestHelper();
process.env.JWT_SECRET = "someJwtSecret";

describe("Recaps Routes", () => {
  beforeAll(async () => {
    await dbTestHelper.startDb();
  });

  const existingUser: User = {
    username: "existinguser",
    email: "existingemail@test.com",
    password: "existingpassword123",
  };
  let existingUserModel;
  let authToken;
  beforeEach(async () => {
    const hashedExistingUserPassword = await UsersModel.hashPassword(existingUser.password);
    existingUserModel = await UsersDao.createUser({
      ...existingUser,
      password: hashedExistingUserPassword,
    });

    const userCredentials: UserCredentials = {
      username: existingUser.username,
      password: existingUser.password,
    };
    await request(app)
      .post("/auth/login")
      .send(userCredentials)
      .then(response => {
        authToken = response.body.token;
      });
  });

  describe("POST /recaps", () => {
    test("should fail to create a recap with validation errors", async () => {
      const invalidOtherRecapWithoutTitle = {
        kind: "Other",
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
      };

      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(invalidOtherRecapWithoutTitle)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({
            message: `"title" is required`,
          });
        });
    });

    test("should be able to create a new recap", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          expect(response.body).toMatchObject(validOtherRecap);
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
