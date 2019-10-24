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
      username: "userone",
      email: "userone@test.com",
      password: "!Useronepassword123",
    };
    userOneModel = new UserModel(userOne);

    await Promise.all([userOneModel.save()]);
  });

  test("should find user by id", async () => {
    const actualFoundUser = await UsersDao.findUserById(userOneModel._id);

    expect(actualFoundUser.username).toBe(userOneModel.username);
    expect(actualFoundUser.email).toBe(userOneModel.email);
  });

  test("should find user by username", async () => {
    const actualFoundUser = await UsersDao.findUserByUsername(userOneModel.username);

    expect(actualFoundUser._id).toEqual(userOneModel._id);
  });

  test("should find user by email", async () => {
    const actualFoundUser = await UsersDao.findUserByEmail(userOne.email);

    expect(actualFoundUser._id).toEqual(userOneModel._id);
  });

  test("should create a user", async () => {
    const userToCreate = {
      username: "createduser",
      email: "createduser@test.com",
      password: "!Createduserpassword123",
    };
    const actualCreatedUser = await UsersDao.createUser(userToCreate);
    const foundCreatedUser = await UsersDao.findUserById(actualCreatedUser._id);

    expect(foundCreatedUser.username).toBe(userToCreate.username);
    expect(foundCreatedUser.email).toBe(userToCreate.email);
  });

  test("should update user by id", async () => {
    const updatedUser = {
      username: "updateduser",
      email: "updatedemail@test.com",
    };
    const actualUpdatedUser = await UsersDao.updateUserById(userOneModel._id, updatedUser);
    const foundUpdatedUser = await UsersDao.findUserById(actualUpdatedUser._id);

    expect(foundUpdatedUser.username).toBe(updatedUser.username);
    expect(foundUpdatedUser.email).toBe(updatedUser.email);
  });

  test("should remove user by id", async () => {
    const actualRemovedUser = await UsersDao.removeUserById(userOneModel._id);
    const findRemovedUserResult = await UsersDao.findUserById(actualRemovedUser._id);

    expect(findRemovedUserResult).toBeNull();
  });

  afterEach(async () => {
    await dbTestHelper.cleanUpDb();
  });

  afterAll(async () => {
    await dbTestHelper.stopDb();
  });
});
