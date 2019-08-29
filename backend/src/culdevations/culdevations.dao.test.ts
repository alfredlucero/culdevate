import CuldevationsDao from "./culdevations.dao";
import CuldevationModel from "./culdevations.model";
import DbTestHelper from "../testUtils/dbTestHelper";

const dbTestHelper = new DbTestHelper();

describe("Culdevations Dao", () => {
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
    culdevationOneModel = new CuldevationModel(culdevationOne);

    culdevationTwo = {
      culdevator: "Culdevator Two",
      title: "Culdevation Two",
      description: "Culdevation Two Description",
      score: 2,
    };
    culdevationTwoModel = new CuldevationModel(culdevationTwo);

    await Promise.all([culdevationOneModel.save(), culdevationTwoModel.save()]);
  });

  test("should find all culdevations", async () => {
    const actualFoundCuldevations = await CuldevationsDao.findAllCuldevations();
    const expectedFoundCuldevations = [culdevationOne, culdevationTwo];

    expect(actualFoundCuldevations).toMatchObject(expectedFoundCuldevations);
  });

  test("should find culdevation by id", async () => {
    const actualFoundCuldevation = await CuldevationsDao.findCuldevationById(
      culdevationOneModel._id
    );
    const expectedFoundCuldevation = culdevationOne;

    expect(actualFoundCuldevation).toMatchObject(expectedFoundCuldevation);
  });

  test("should be able to create a new culdevation", async () => {
    const culdevationToCreate = {
      culdevator: "Culdevator One",
      title: "Culdevation One",
      description: "Culdevation One Description",
      score: 1,
    };
    const actualCreatedCuldevation = await CuldevationsDao.createCuldevation(
      culdevationToCreate
    );
    const foundCreatedCuldevation = await CuldevationsDao.findCuldevationById(
      actualCreatedCuldevation._id
    );

    expect(foundCreatedCuldevation).toMatchObject(culdevationToCreate);
  });

  test("should be able to update culdevation by id", async () => {
    const updatedCuldevation = {
      culdevator: "Culdevator Updated",
      title: "Culdevation Updated",
      description: "Culdevation Updated Description",
      score: 3,
    };
    const actualUpdatedCuldevation = await CuldevationsDao.updateCuldevationById(
      culdevationOneModel._id,
      updatedCuldevation
    );
    const foundUpdatedCuldevation = await CuldevationsDao.findCuldevationById(
      actualUpdatedCuldevation._id
    );

    expect(foundUpdatedCuldevation).toMatchObject(updatedCuldevation);
  });

  test("should be able to remove culdevation by id", async () => {
    const actualRemovedCuldevation = await CuldevationsDao.removeCuldevationById(
      culdevationOneModel._id
    );
    const findRemovedCuldevationResult = await CuldevationsDao.findCuldevationById(
      actualRemovedCuldevation._id
    );

    expect(findRemovedCuldevationResult).toBeNull();
  });

  afterEach(async () => {
    await dbTestHelper.cleanUpDb();
  });

  afterAll(async () => {
    await dbTestHelper.stopDb();
  });
});
