import { Router, Request, Response } from "express";
// import ImpactsController from "./impacts.controller";

const ImpactsRoutes = {
  path: "/impacts",
  router: Router(),

  initializeRoutes() {
    // GET /impacts
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // GET /impacts/:impactId
    this.router.get("/:impactId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // POST /impacts
    this.router.post("/", (req: Request, res: Response) => {
      res.status(201).json({ message: "Success" });
    });

    // PUT /impacts/:impactId
    this.router.put("/:impactId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // DELETE /impacts/:impactId
    this.router.delete("/:impactId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    return this.router;
  },
};

export default ImpactsRoutes;
