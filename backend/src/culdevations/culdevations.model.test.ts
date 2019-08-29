import CuldevationModel from "./culdevations.model";

describe("Culdevations Model", () => {
  test("should validate without error given all required properties", done => {
    const validCuldevationModel = new CuldevationModel({
      culdevator: "Culdevator",
      title: "Culdevation title",
      description: "Culdevation description",
      score: 100,
    });

    validCuldevationModel.validate(err => {
      expect(err).toBeFalsy();
      done();
    });
  });

  test("should have validation error without required score property", done => {
    const invalidCuldevationModel = new CuldevationModel({
      culdevator: "Culdevator",
      title: "Culdevation title",
      description: "Culdevation description",
    });

    invalidCuldevationModel.validate(err => {
      expect(err.errors.score).toBeTruthy();
      done();
    });
  });
});
