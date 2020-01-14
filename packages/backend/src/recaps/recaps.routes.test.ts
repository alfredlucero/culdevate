import request from "supertest";
import app from "../app";
import { Recap } from "../recaps/recaps.model";
import RecapsDao from "../recaps/recaps.dao";
import UsersDao from "../users/users.dao";
import UsersModel, { User } from "../users/users.model";
import { UserCredentials } from "../auth/auth.controller";
import DbTestHelper from "../testUtils/dbTestHelper";
import { generateObjectIdString } from "../testUtils/generateObjectId";

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
  const otherUserId = generateObjectIdString();
  const otherUserRecap: Recap = {
    kind: "Other",
    bulletPoints: [],
    title: "Other User",
    userId: otherUserId,
  };
  let otherUserRecapId;
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

    const createdOtherUserRecap = await RecapsDao.createRecap(otherUserRecap);
    otherUserRecapId = createdOtherUserRecap._id;
  });

  describe("POST /recaps", () => {
    test("should fail to create a recap without proper authorization", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      await request(app)
        .post("/recaps")
        .send(validOtherRecap)
        .expect(401);
    });

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

  describe("GET /recaps/:recapId", () => {
    test("should fail to get recap details without proper authorization", async () => {
      await request(app)
        .get("/recaps/recapId")
        .expect(401);
    });

    test("should fail to get recap details of recap that no longer exists", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      let otherRecapId;
      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          otherRecapId = response.body._id;
        });

      await request(app)
        .delete(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      await request(app)
        .get(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404)
        .then(response => {
          expect(response.body).toMatchObject({ message: "Failed to find matching recap details" });
        });
    });

    test("should get recap details of existing recap", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      let otherRecapId;
      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          otherRecapId = response.body._id;
        });

      await request(app)
        .get(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject(validOtherRecap);
        });
    });
  });

  describe("PATCH /recaps/:recapId", () => {
    test("should fail to update recap without proper authorization", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      await request(app)
        .patch("/recaps/recapId")
        .send(validOtherRecap)
        .expect(401);
    });

    test("should fail to update recap with validation errors", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      let otherRecapId;
      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          otherRecapId = response.body._id;
        });

      const invalidUpdatedOtherRecap = {
        ...validOtherRecap,
        incorrectProperty: "Blah",
      };
      await request(app)
        .patch(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(invalidUpdatedOtherRecap)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({ message: `"incorrectProperty" is not allowed` });
        });
    });

    test("should fail to update another user's recap", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };
      await request(app)
        .patch(`/recaps/${otherUserRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(404)
        .then(response => {
          expect(response.body).toMatchObject({ message: "Failed to find matching recap to update" });
        });
    });

    test("should be able to update a recap", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      let otherRecapId;
      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          otherRecapId = response.body._id;
        });

      const updatedOtherRecap = {
        ...validOtherRecap,
        title: "Updated Other Title",
      };
      await request(app)
        .patch(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedOtherRecap)
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject(updatedOtherRecap);
        });
    });
  });

  describe("DELETE /recaps/:recapId", () => {
    test("should fail to delete a recap without proper authorization", async () => {
      await request(app)
        .delete("/recaps/unauthorized")
        .expect(401);
    });

    test("should fail to delete non-existent recap", async () => {
      const notFoundRecapId = generateObjectIdString();
      await request(app)
        .delete(`/recaps/${notFoundRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404)
        .then(response => {
          expect(response.body).toMatchObject({
            message: "Failed to find matching recap to delete",
          });
        });
    });

    test("should fail to delete another user's recap", async () => {
      await request(app)
        .delete(`/recaps/${otherUserRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404)
        .then(response => expect(response.body).toMatchObject({ message: "Failed to find matching recap to delete" }));
    });

    test("should successfully delete an existing recap", async () => {
      const validOtherRecap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
      };

      let otherRecapId;
      await request(app)
        .post("/recaps")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validOtherRecap)
        .expect(201)
        .then(response => {
          otherRecapId = response.body._id;
        });

      await request(app)
        .delete(`/recaps/${otherRecapId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)
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
