import UsersDao from "./users.dao";
import UserModel from "./users.model";
import DbTestHelper from "../testUtils/dbTestHelper";

const dbTestHelper = new DbTestHelper();

describe("Users Dao", () => {
  beforeAll(async () => {
    await dbTestHelper.startDb();
  });

  let userOne, userOneModel;
  beforeEach(async () => {
    userOne = {
      email: "userone@test.com",
      password: "!Useronepassword123",
    };
    userOneModel = new UserModel(userOne);

    await Promise.all([userOneModel.save()]);
  });

  test("should find user by id", async () => {
    const actualFoundUser = await UsersDao.findUserById(userOneModel._id);

    expect(actualFoundUser.email).toBe(userOneModel.email);
  });

  test("should find user by email", async () => {
    const actualFoundUser = await UsersDao.findUserByEmail(userOne.email);

    expect(actualFoundUser.email).toBe(userOneModel.email);
  });

  test("should find user by credentials", async () => {
    const actualFoundUser = await UsersDao.findUserByCredentials({
      email: userOne.email,
      password: userOne.password,
    });

    expect(actualFoundUser.email).toBe(userOneModel.email);
  });

  test("should create a user", async () => {
    const userToCreate = {
      email: "createduser@test.com",
      password: "!Createduserpassword123",
    };
    const actualCreatedUser = await UsersDao.createUser(userToCreate);
    const foundCreatedUser = await UsersDao.findUserById(actualCreatedUser._id);

    expect(foundCreatedUser.email).toBe(userToCreate.email);
  });

  test("should update user by id", async () => {
    const updatedUser = {
      email: "updatedemail@test.com",
    };
    const actualUpdatedUser = await UsersDao.updateUserById(
      userOneModel._id,
      updatedUser
    );
    const foundUpdatedUser = await UsersDao.findUserById(actualUpdatedUser._id);

    expect(foundUpdatedUser.email).toBe(updatedUser.email);
  });

  test("should remove user by id", async () => {
    const actualRemovedUser = await UsersDao.removeUserById(userOneModel._id);
    const findRemovedUserResult = await UsersDao.findUserById(
      actualRemovedUser._id
    );

    expect(findRemovedUserResult).toBeNull();
  });

  afterEach(async () => {
    await dbTestHelper.cleanUpDb();
  });

  afterAll(async () => {
    await dbTestHelper.stopDb();
  });
});
