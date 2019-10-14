import { Request } from "express";
import { IUser } from "../users/users.model";

export interface RequestWithUser extends Request {
  user: IUser;
}
