import { Router } from "express";
import CuldevationsController from "./culdevations.controller";

const CuldevationsRoutes = {
  path: "/culdevations",
  router: Router(),

  initializeRoutes() {
    // GET /culdevations
    this.router.get("/", CuldevationsController.getAllCuldevations);

    // GET /culdevations/:culdevationId
    this.router.get("/:culdevationId", CuldevationsController.getCuldevationDetails);

    // POST /culdevations
    this.router.post("/", CuldevationsController.createCuldevation);

    // PUT /culdevations/:culdevationId
    this.router.put("/:culdevationId", CuldevationsController.updateCuldevation);

    // DELETE /culdevations/:culdevationId
    this.router.delete("/:culdevationId", CuldevationsController.deleteCuldevation);

    return this.router;
  },
};

export default CuldevationsRoutes;
