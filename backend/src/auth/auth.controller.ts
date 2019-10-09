import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsersDao from "../users/users.dao";
import UserModel, { IUser } from "../users/users.model";

interface SignupUser {
  username: IUser["username"];
  email: IUser["email"];
  password: IUser["password"];
}

interface UserCredentials {
  username: IUser["username"];
  password: IUser["password"];
}

const AuthController = {
  async signup(req: Request, res: Response) {
    const signupUser: SignupUser = req.body;
    try {
      const isUserWithSameUsername = await UsersDao.findUserByUsername(
        signupUser.username
      );
      if (isUserWithSameUsername) {
        // TODO: use error handling middleware
        res.status(400).json({ message: "Username is already taken." });
      }

      try {
        const isUserWithSameEmail = await UsersDao.findUserByEmail(
          signupUser.email
        );
        if (isUserWithSameEmail) {
          // TODO: use error handling middleware
          res.status(400).json({ message: "Email is already taken." });
        }

        const hashedPassword = await UserModel.hashPassword(
          signupUser.password
        );
        const userToCreate = {
          username: signupUser.username,
          email: signupUser.email,
          password: hashedPassword,
        };

        try {
          const createdUser = await UsersDao.createUser(userToCreate);

          const { _id: id, username } = createdUser;
          const jwtPayload = {
            id,
            username,
          };
          const jwtSecret = process.env.JWT_SECRET || "someJwtSecret";
          jwt.sign(jwtPayload, jwtSecret, function jwtSignCallback(err, token) {
            if (err) {
              // TODO: use error handling middleware
              res
                .status(500)
                .json({ message: "Failed to sign and generate JWT." });
            }

            res.status(200).json({ token: `Bearer ${token}` });
          });
        } catch (err) {
          // TODO: use error handling middleware
          res.status(500).json({ message: "Failed to create user." });
        }
      } catch (err) {
        // TODO: use error handling middleware
        res
          .status(500)
          .json({ message: "Failed to determine if email is already taken." });
      }
    } catch (err) {
      // TODO: use error handling middleware
      res
        .status(500)
        .json({ message: "Failed to determine if username is already taken." });
    }
  },

  async login(req: Request, res: Response) {
    const userCredentials: UserCredentials = req.body;
    const { username, password } = userCredentials;

    try {
      const foundUser = await UsersDao.findUserByUsername(username);
      if (foundUser) {
        const isPasswordMatch = await foundUser.comparePassword(password);
        if (isPasswordMatch) {
          const { _id: id, username } = foundUser;
          const jwtPayload = {
            id,
            username,
          };
          const jwtSecret = process.env.JWT_SECRET || "someJwtSecret";
          jwt.sign(jwtPayload, jwtSecret, function jwtSignCallback(err, token) {
            if (err) {
              // TODO: use error handling middleware
              res
                .status(500)
                .json({ message: "Failed to sign and generate JWT." });
            }

            res.status(200).json({ token: `Bearer ${token}` });
          });
        } else {
          // TODO: use error handling middleware
          res.status(401).json({ message: "Passwords do not match." });
        }
      }

      // TODO: use error handling middleware
      res.status(401).json({ message: "Username not found." });
    } catch (err) {
      // TODO: use error handling middleware
      res.status(500).json({ message: "Internal server error - login" });
    }
  },
};

export default AuthController;
