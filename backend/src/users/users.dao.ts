import UserModel, { IUser } from "./users.model";

interface UserCredentials {
  username: IUser["username"];
  password: IUser["password"];
}

const UsersDao = {
  findUserById(userId: string) {
    return UserModel.findById(userId);
  },

  findUserByUsername(username: IUser["username"]) {
    return UserModel.findOne({ username });
  },

  findUserByEmail(email: IUser["email"]) {
    return UserModel.findOne({ email });
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
