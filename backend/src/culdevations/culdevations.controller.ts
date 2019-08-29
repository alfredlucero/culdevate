import { Request, Response } from "express";
import CuldevationsDao from "./culdevations.dao";
import { ICuldevation } from "./culdevations.model";

const CuldevationsController = {
  async getAllCuldevations(req: Request, res: Response) {
    try {
      const culdevations = await CuldevationsDao.findAllCuldevations();

      res.status(200).json(culdevations);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve all culdevations" });
    }
  },

  async getCuldevationDetails(req: Request, res: Response) {
    const culdevationId = req.params.culdevationId;

    try {
      const foundCuldevation = await CuldevationsDao.findCuldevationById(
        culdevationId
      );

      if (foundCuldevation) {
        res.status(200).json(foundCuldevation);
      } else {
        res
          .status(404)
          .json({ message: "Failed to find culdevation with matching id" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve culdevation details" });
    }
  },

  async createCuldevation(req: Request, res: Response) {
    const culdevation: ICuldevation = req.body;

    try {
      const createdCuldevation = await CuldevationsDao.createCuldevation(
        culdevation
      );

      res.status(201).json(createdCuldevation);
    } catch (err) {
      res.status(500).json({ message: "Failed to create culdevation" });
    }
  },

  async updateCuldevation(req: Request, res: Response) {
    const culdevationId = req.params.culdevationId;
    const culdevation: ICuldevation = req.body;

    try {
      const updatedCuldevation = await CuldevationsDao.updateCuldevationById(
        culdevationId,
        culdevation
      );

      if (updatedCuldevation) {
        res.status(200).json(updatedCuldevation);
      } else {
        res
          .status(404)
          .json({ message: "Failed to find matching culdevation to update" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to update culdevation" });
    }
  },

  async deleteCuldevation(req: Request, res: Response) {
    const culdevationId = req.params.culdevationId;

    try {
      const deletedCuldevation = await CuldevationsDao.removeCuldevationById(
        culdevationId
      );

      if (deletedCuldevation) {
        res.status(200).json(deletedCuldevation);
      } else {
        res
          .status(404)
          .json({ message: "Failed to find matching culdevation to delete" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to delete culdevation" });
    }
  },
};

export default CuldevationsController;
