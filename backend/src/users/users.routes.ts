import { Router } from "express";

const UsersRoutes = {
  path: "/users",
  router: Router(),

  initializeRoutes() {
    // /users ?username ?email
    // Return 204 no content if user is found with username and/or email
    // Return 404 if no user found with matching username/email
    this.router.get("/", () => {});

    // Protected
    // Validate JWT id matches up with userId
    // On 200 success, Return user profile information (exclude password)
    // If JWT id doesn't match with userId - 403 unauthorized
    // If no user found, 404
    this.router.get("/:userId", () => {});

    // Protected
    // Validate JWT id matches up with userID
    // On 200 success, update user profile information
    // If no user found, 404
    // If JWT id doesn't match with user id, 403
    this.router.patch("/:userId", () => {});

    // Protected
    // Validate JWT id matches up with userID
    // On 204 success, delete user and all references in other collections
    // If no user found, 404
    // If JWT id doesn't match with user id, 403
    this.router.delete("/:userId", () => {});

    return this.router;
  },
};

export default UsersRoutes;
