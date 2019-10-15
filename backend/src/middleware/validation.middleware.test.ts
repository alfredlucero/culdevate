import Joi from "@hapi/joi";
import validationMiddleware from "./validation.middleware";
import { mockRequest } from "../testUtils/mockRequest";
import { mockResponse } from "../testUtils/mockResponse";
import { mockNext } from "../testUtils/mockNext";

describe("Validation Middleware", () => {
  describe("Given a schema and request property to validate the schema against", () => {
    const sampleUserSchema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    test("should properly call next function for valid request body", () => {
      const validateRequest = validationMiddleware(sampleUserSchema, "body");
      const req = mockRequest({
        body: { username: "username", password: "testing123" },
      });
      const res = mockResponse();
      const next = mockNext();

      validateRequest(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test("should fail with bad request for invalid request body", () => {
      const validateRequest = validationMiddleware(sampleUserSchema, "body");
      const req = mockRequest({ body: { username: "missingpassword" } });
      const res = mockResponse();
      const next = mockNext();

      validateRequest(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: `"password" is required`,
      });
    });
  });
});
