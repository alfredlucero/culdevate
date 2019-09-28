import UserModel, { IUser } from "./users.model";

interface UserCredentials {
  email: IUser["email"];
  password: IUser["password"];
}

const UsersDao = {
  findUserById(userId: string) {
    return UserModel.findById(userId);
  },

  findUserByEmail(email: IUser["email"]) {
    return UserModel.findOne({ email });
  },

  findUserByCredentials(credentials: UserCredentials) {
    return UserModel.findOne(credentials);
  },

  createUser(user: IUser) {
    const createdUser = new UserModel(user);

    return createdUser.save();
  },

  updateUserById(userId: string, updatedUser: Partial<IUser>) {
    return UserModel.findOneAndUpdate({ _id: userId }, updatedUser, {
      new: true,
    });
  },

  removeUserById(userId: string) {
    return UserModel.findByIdAndDelete({ _id: userId });
  },
};

export default UsersDao;
