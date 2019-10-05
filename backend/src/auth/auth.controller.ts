import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsersDao from "../users/users.dao";
import { IUser, IUserModel } from "../users/users.model";

interface UserCredentials {
  username: IUser["username"];
  password: IUser["password"];
}

const AuthController = {
  async signup(req: Request, res: Response) {
    res.status(200);
  },

  async login(req: Request, res: Response) {
    const userCredentials: UserCredentials = req.body;
    const { username, password } = userCredentials;

    try {
      const foundUser = await UsersDao.findUserByUsername(username);
      if (foundUser) {
        const isPasswordMatch = await foundUser.comparePassword(password);
        if (isPasswordMatch) {
        } else {
          // TODO: use error handling middleware
          res.status(401).json({ message: "Passwords do not match." });
        }
      }

      res.status(401).json({ message: "Username not found." });
    } catch (err) {
      res.status(500).json({ message: "Internal server error - login" });
    }
  },
};

interface AuthToken {}

const generateAuthToken = (user: IUserModel) => {};

const generateAuthCookie = () => {};

export default AuthController;
