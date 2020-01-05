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

  async updateRecap(req: RequestWithUser, res: Response) {
    const currentUser = req.user;
    const recapId = req.params.recapId;
    const updatedRecap: Recap = {
      ...req.body,
      userId: currentUser.id,
    };

    try {
      const changedRecap = await RecapsDao.updateRecapById({ recapId, updatedRecap });
      res.status(200).json(changedRecap);
    } catch (err) {
      res.status(500).json({ message: "Failed to update recap." });
    }
  },
};

export default RecapsController;
