import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends User, mongoose.Document {
  comparePassword(plaintextPassword: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  hashPassword(plaintextPassword: string): Promise<string>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
    trim: true,
  },
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
  // TODO: add first name, last name, company
});

// Instance Methods
userSchema.method("comparePassword", async function comparePassword(plaintextPassword: string) {
  const hashedPassword = this.password;
  const isPasswordMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  return isPasswordMatch;
});

// Static Methods
const BCRYPT_SALT_ROUNDS = 12;

userSchema.static("hashPassword", async function hashPassword(plaintextPassword: string) {
  const hashedPassword = await bcrypt.hash(plaintextPassword, BCRYPT_SALT_ROUNDS);
  return hashedPassword;
});

const UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default UserModel;
