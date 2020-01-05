import { Request } from "express";
import { User } from "../users/users.model";

export interface UserData {
  username: User["username"];
  email: User["email"];
  id: string;
}

export interface RequestWithUser extends Request {
  user: UserData;
}
