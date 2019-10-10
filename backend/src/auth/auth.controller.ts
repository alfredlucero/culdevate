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

    // TODO: validate signup user and return 400 if invalid

    try {
      const isUserWithSameUsername = await UsersDao.findUserByUsername(
        signupUser.username
      );
      if (isUserWithSameUsername) {
        return res.status(400).json({ message: "Username is already taken." });
      }

      try {
        const isUserWithSameEmail = await UsersDao.findUserByEmail(
          signupUser.email
        );
        if (isUserWithSameEmail) {
          return res.status(400).json({ message: "Email is already taken." });
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
              return res
                .status(500)
                .json({ message: "Failed to sign and generate JWT." });
            }

            return res.status(200).json({ token });
          });
        } catch (err) {
          res.status(500).json({ message: "Failed to create user." });
        }
      } catch (err) {
        res
          .status(500)
          .json({ message: "Failed to determine if email is already taken." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to determine if username is already taken." });
    }
  },

  async login(req: Request, res: Response) {
    const userCredentials: UserCredentials = req.body;
    const { username, password } = userCredentials;

    // TODO: validate user credentials and return 400 if invalid

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
              return res
                .status(500)
                .json({ message: "Failed to sign and generate JWT." });
            }

            return res.status(200).json({ token });
          });
        } else {
          return res.status(401).json({ message: "Passwords do not match." });
        }
      } else {
        return res.status(401).json({ message: "Username not found." });
      }
    } catch (err) {
      res.status(500).json({
        message: "Failed to determine if username exists.",
      });
    }
  },
};

export default AuthController;
