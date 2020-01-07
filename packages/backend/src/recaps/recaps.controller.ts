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
      const foundRecap = await RecapsDao.findRecapById(recapId);
      const isMatchingUserId = foundRecap && foundRecap.userId.toString() === currentUser.id;

      if (!foundRecap || !isMatchingUserId) {
        return res.status(404).json({ message: "Failed to find matching recap to update" });
      }

      const changedRecap = await RecapsDao.updateRecapById({ recapId, updatedRecap });

      if (changedRecap) {
        res.status(200).json(changedRecap);
      } else {
        // If by some chance it got deleted while we were trying to update it
        // we'll still get a 404 back
        res.status(404).json({ message: "Failed to find matching recap to update" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to update recap" });
    }
  },

  async deleteRecap(req: RequestWithUser, res: Response) {
    const recapId = req.params.recapId;
    const currentUser = req.user;

    try {
      const foundRecap = await RecapsDao.findRecapById(recapId);
      const isMatchingUserId = foundRecap && foundRecap.userId.toString() === currentUser.id;

      if (!foundRecap || !isMatchingUserId) {
        return res.status(404).json({ message: "Failed to find matching recap to delete" });
      }

      const deletedRecap = await RecapsDao.removeRecapById(recapId);

      if (deletedRecap) {
        res.status(200).json(deletedRecap);
      } else {
        // If by some chance it got deleted while we were trying to delete it
        // we'll still get a 404 back
        res.status(404).json({ message: "Failed to find matching recap to delete" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to delete recap" });
    }
  },
};

export default RecapsController;
