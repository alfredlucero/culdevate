import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
