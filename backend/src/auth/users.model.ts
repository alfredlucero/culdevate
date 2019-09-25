import mongoose from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
