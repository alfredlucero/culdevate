import { Router } from "express";
import AuthController from "./auth.controller";

const AuthRoutes = {
  path: "/auth",
  router: Router(),

  initializeRoutes() {
    this.router.get("/signup", AuthController.signup);

    this.router.get("/login", AuthController.login);

    // Logout will be through the frontend and clearing the JWT cookie

    // Future Auth niceties
    // /reset_password and /forgot_password?
    // /confirm_email
    // /resend_email_confirmation
    // /login and /signup through Facebook, Twitter, GSuite

    return this.router;
  },
};

export default AuthRoutes;
