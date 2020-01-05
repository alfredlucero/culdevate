import { Router } from "express";
import RecapsController from "./recaps.controller";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { RecapSchema } from "./recaps.validation";

const RecapsRoutes = {
  path: "/recaps",
  router: Router(),

  initializeRoutes() {
    // POST /recaps
    this.router.post("/", authMiddleware, validationMiddleware(RecapSchema, "body"), RecapsController.createRecap);

    return this.router;
  },
};

export default RecapsRoutes;
