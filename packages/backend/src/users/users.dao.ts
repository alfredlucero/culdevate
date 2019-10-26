import UserModel, { User } from "./users.model";

const UsersDao = {
  findUserById(userId: string) {
    return UserModel.findById(userId);
  },

  findUserByUsername(username: User["username"]) {
    return UserModel.findOne({ username });
  },

  findUserByEmail(email: User["email"]) {
    return UserModel.findOne({ email });
  },

  createUser(user: User) {
    const createdUser = new UserModel(user);

    return createdUser.save();
  },

  updateUserById(userId: string, updatedUser: Partial<User>) {
    return UserModel.findOneAndUpdate({ _id: userId }, updatedUser, {
      new: true,
    });
  },

  removeUserById(userId: string) {
    return UserModel.findByIdAndDelete({ _id: userId });
  },
};

export default UsersDao;
