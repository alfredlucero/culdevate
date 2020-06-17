import { Router, Request, Response } from "express";
// import SelfReviewsController from "./selfreviews.controller";

const SelfReviewsRoutes = {
  path: "/selfreviews",
  router: Router(),

  initializeRoutes() {
    // GET /selfreviews
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // GET /selfreviews/:selfReviewId
    this.router.get("/:selfReviewId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // POST /selfreviews
    this.router.post("/", (req: Request, res: Response) => {
      res.status(201).json({ message: "Success" });
    });

    // PUT /selfreviews/:selfReviewId
    this.router.put("/:selfReviewId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    // DELETE /selfreviews/:selfReviewId
    this.router.delete("/:selfReviewId", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success" });
    });

    return this.router;
  },
};

export default SelfReviewsRoutes;
