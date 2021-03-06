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

    // GET /recaps
    this.router.get("/", authMiddleware, RecapsController.getAllRecaps);

    // GET /recaps/:recapId
    this.router.get("/:recapId", authMiddleware, RecapsController.getRecapDetails);

    // PATCH /recaps/:recapId
    this.router.patch(
      "/:recapId",
      authMiddleware,
      validationMiddleware(RecapSchema, "body"),
      RecapsController.updateRecap,
    );

    // DELETE /recaps/:recapId
    this.router.delete("/:recapId", authMiddleware, RecapsController.deleteRecap);

    return this.router;
  },
};

export default RecapsRoutes;
