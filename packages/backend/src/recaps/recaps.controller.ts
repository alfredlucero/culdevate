import { Response } from "express";
import { RequestWithUser } from "../interfaces/requestWithUser";
import RecapsDao from "./recaps.dao";
import { Recap } from "./recaps.model";

const RecapsController = {
  async createRecap(req: RequestWithUser, res: Response) {
    const currentUser = req.user;
    const recap: Recap = {
      ...req.body,
      userId: currentUser.id,
    };

    try {
      const createdRecap = await RecapsDao.createRecap(recap);

      res.status(201).json(createdRecap);
    } catch (err) {
      res.status(500).json({ message: "Failed to create recap." });
    }
  },
};

export default RecapsController;
