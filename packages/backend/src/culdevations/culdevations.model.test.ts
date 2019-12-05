import CuldevationModel from "./culdevations.model";

describe("Culdevations Model", () => {
  test("should validate without error given all required properties", () => {
    const validCuldevationModel = new CuldevationModel({
      culdevator: "Culdevator",
      title: "Culdevation title",
      description: "Culdevation description",
      score: 100,
    });

    const validationErrors = validCuldevationModel.validateSync();

    expect(validationErrors).toBeFalsy();
  });

  test("should have validation error without required score property", () => {
    const invalidCuldevationModel = new CuldevationModel({
      culdevator: "Culdevator",
      title: "Culdevation title",
      description: "Culdevation description",
    });

    const validationErrors = invalidCuldevationModel.validateSync();

    expect(validationErrors.errors.score).toBeTruthy();
  });
});
