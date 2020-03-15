import axios from "axios";
import { UserCredentials, SignupUser, AuthToken } from "./auth.interface";

export const login = (userCredentials: UserCredentials) => {
  return axios.post<AuthToken>("/auth/login", userCredentials);
};

export const signup = (signupUser: SignupUser) => {
  return axios.post<AuthToken>("/auth/signup", signupUser);
};
