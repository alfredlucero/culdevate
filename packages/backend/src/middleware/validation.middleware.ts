import { Schema } from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

const validationMiddleware = (schema: Schema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const isValid = !error;
    if (isValid) {
      next();
    } else {
      const { details } = error;
      const errorMessage = details.map(detail => detail.message).join(",");
      console.error("Validation Error Message: ", errorMessage);
      res.status(400).json({ message: errorMessage });
    }
  };
};

export default validationMiddleware;
