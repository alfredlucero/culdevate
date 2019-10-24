import { Request } from "express";
import { User } from "../users/users.model";

export interface RequestWithUser extends Request {
  user: User;
}
