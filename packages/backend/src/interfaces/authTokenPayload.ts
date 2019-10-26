import { User } from "../users/users.model";

export interface AuthTokenPayload {
  id: string;
  username: User["username"];
}
