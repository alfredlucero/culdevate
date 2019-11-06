import axios from "axios";
import { UserCredentials, SignupUser, AuthToken } from "../interfaces/auth.interface";

export const login = (userCredentials: UserCredentials) => {
  return axios.post<AuthToken>("/auth/login", userCredentials, { baseURL: process.env.API_HOST });
};

export const signup = (signupUser: SignupUser) => {
  return axios.post<AuthToken>("/auth/signup", signupUser, { baseURL: process.env.API_HOST });
};
