import UserModel from "./users.model";

describe("User Model", () => {
  test("should validate without error given all required properties", done => {
    const validUserModel = new UserModel({
      email: "test@user.com",
      password: "testpassword",
    });

    validUserModel.validate(err => {
      expect(err).toBeNull();
      done();
    });
  });

  test("should have validation error without required properties", done => {
    const invalidUserModel = new UserModel({});

    invalidUserModel.validate(err => {
      expect(err.errors.email.message).toBe("Email is required.");
      expect(err.errors.password.message).toBe("Password is required.");
      done();
    });
  });
});
