import { IUser } from "../users/users.model";

export interface AuthTokenPayload {
  id: string;
  username: IUser["username"];
}
