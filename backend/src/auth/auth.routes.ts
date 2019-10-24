import { Router } from "express";
import AuthController from "./auth.controller";
import validationMiddleware from "../middleware/validation.middleware";
import { SignupUserSchema, UserCredentialsSchema } from "./auth.validation";

const AuthRoutes = {
  path: "/auth",
  router: Router(),

  initializeRoutes() {
    this.router.post("/signup", validationMiddleware(SignupUserSchema, "body"), AuthController.signup);

    this.router.post("/login", validationMiddleware(UserCredentialsSchema, "body"), AuthController.login);

    // Logout will be through the frontend and clearing the JWT cookie
    // such that the JWT cookie will no longer be passed through the
    // Authorization: bearer <token> header

    // Future Auth niceties
    // /reset_password and/or /forgot_password
    // /confirm_email
    // /resend_email_confirmation
    // /login and /signup through Facebook, Twitter, GSuite

    return this.router;
  },
};

export default AuthRoutes;
