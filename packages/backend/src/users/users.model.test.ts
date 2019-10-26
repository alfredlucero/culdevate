import UserModel from "./users.model";

describe("User Model", () => {
  test("should validate without error given all required properties", done => {
    const validUserModel = new UserModel({
      username: "testuser",
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

    invalidUserModel.validate(({ errors: validationErrors }) => {
      expect(validationErrors.username.message).toBe("Username is required.");
      expect(validationErrors.email.message).toBe("Email is required.");
      expect(validationErrors.password.message).toBe("Password is required.");
      done();
    });
  });

  test("should return a hashed password for hashPassword static method", async () => {
    const plaintextPassword = "testing123";
    const hashedPassword = await UserModel.hashPassword(plaintextPassword);

    expect(hashedPassword).not.toBe(plaintextPassword);
  });

  test("should return true for comparePassword instance method with matching plaintext password and hashed password", async () => {
    const plaintextPassword = "testing123";
    const hashedPassword = await UserModel.hashPassword(plaintextPassword);
    // On pre-save, we would usually hash the password then but for testing purposes, we're setting it hashed already
    const user = new UserModel({
      username: "user",
      password: hashedPassword,
      email: "user@test.com",
    });

    const isPasswordMatch = await user.comparePassword(plaintextPassword);

    expect(isPasswordMatch).toBe(true);
  });

  test("should return false for comparePassword instance method with unmatched passwords", async () => {
    const user = new UserModel({
      username: "user",
      password: "testing123",
      email: "user@test.com",
    });

    const isPasswordMatch = await user.comparePassword("wrongpassword");

    expect(isPasswordMatch).toBe(false);
  });
});
