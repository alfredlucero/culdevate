import { Request, Response } from "express";
import UsersDao from "../users/users.dao";
import { IUser } from "../users/users.model";

const AuthController = {
  async signup(req: Request, res: Response) {
    res.status(200);
  },

  async login(req: Request, res: Response) {
    res.status(200);
  },

  async logout(req: Request, res: Response) {
    res.status(200);
  },
};

export default AuthController;
