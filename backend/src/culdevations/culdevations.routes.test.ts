import request from "supertest";
import app from "../app";
import CuldevationsDao from "./culdevations.dao";
import DbTestHelper from "../testUtils/dbTestHelper";

const dbTestHelper = new DbTestHelper();

describe("Culdevations Routes (/culdevations/**/*)", () => {
  beforeAll(async () => {
    await dbTestHelper.startDb();
  });

  let culdevationOne, culdevationTwo;
  let culdevationOneModel, culdevationTwoModel;
  beforeEach(async () => {
    culdevationOne = {
      culdevator: "Culdevator One",
      title: "Culdevation One",
      description: "Culdevation One Description",
      score: 1,
    };
    culdevationOneModel = await CuldevationsDao.createCuldevation(
      culdevationOne
    );

    culdevationTwo = {
      culdevator: "Culdevator Two",
      title: "Culdevation Two",
      description: "Culdevation Two Description",
      score: 2,
    };
    culdevationTwoModel = await CuldevationsDao.createCuldevation(
      culdevationTwo
    );
  });

  test("should return some culdevations for GET /culdevations", async () => {
    await request(app)
      .get("/culdevations")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject([culdevationOne, culdevationTwo]);
      });
  });

  test("should return 200 culdevation details for found GET /culdevations/:culdevationId", async () => {
    await request(app)
      .get(`/culdevations/${culdevationOneModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(culdevationOne);
      });
  });

  test("should return 404 not found for missing culdevation details for GET /culdevations/:culdevationId", async () => {
    await request(app)
      .delete(`/culdevations/${culdevationOneModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(culdevationOne);
      });
    await request(app)
      .get(`/culdevations/${culdevationOneModel._id}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toMatchObject({
          message: "Failed to find culdevation with matching id",
        });
      });
  });

  test("should 201 upon successfully creating culdevation for POST /culdevations", async () => {
    const culdevationToCreate = {
      culdevator: "Culdevator Created",
      title: "Culdevation Created",
      description: "Culdevation Created Description",
      score: 1,
    };
    await request(app)
      .post("/culdevations")
      .send(culdevationToCreate)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(culdevationToCreate);
      });
    await request(app)
      .get("/culdevations")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject([
          culdevationOne,
          culdevationTwo,
          culdevationToCreate,
        ]);
      });
  });

  test("should return 200 upon successfully updating culdevation for PUT /culdevations/:culdevationId", async () => {
    const updatedCuldevation = {
      ...culdevationTwo,
      culdevator: "Culdevator Updated",
      title: "Culdevation Updated",
    };
    await request(app)
      .put(`/culdevations/${culdevationTwoModel._id}`)
      .send(updatedCuldevation)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(updatedCuldevation);
      });
    await request(app)
      .get(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(updatedCuldevation);
      });
  });

  test("should return 404 not found for unmatched id for PUT /culdevations/:culdevationId", async () => {
    await request(app)
      .delete(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(culdevationTwo);
      });
    await request(app)
      .put(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toMatchObject({
          message: "Failed to find matching culdevation to update",
        });
      });
  });

  test("should return 200 upon successfully deleting culdevation for DELETE /culdevations/:culdevationId", async () => {
    await request(app)
      .delete(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({});
      });
    await request(app)
      .get("/culdevations")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject([culdevationOne]);
      });
  });

  test("should return 404 not found for unmatched id for DELETE /culdevations/:culdevationId", async () => {
    await request(app)
      .delete(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({});
      });
    await request(app)
      .delete(`/culdevations/${culdevationTwoModel._id}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toMatchObject({
          message: "Failed to find matching culdevation to delete",
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
