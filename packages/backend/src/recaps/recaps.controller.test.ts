import RecapsController from "./recaps.controller";
import RecapsDao from "./recaps.dao";
import { Recap } from "./recaps.model";
import { mockRequestWithUser } from "../testUtils/mockRequestWithUser";
import { mockResponse } from "../testUtils/mockResponse";
import { generateObjectIdString } from "../testUtils/generateObjectId";

describe("Recaps Controller", () => {
  const userId = generateObjectIdString();

  describe("When creating a recap", () => {
    test("should return 201 status with created recap data on success", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const createRecapSpy = (jest.spyOn(RecapsDao, "createRecap") as jest.SpyInstance).mockImplementation(() =>
        Promise.resolve(recap),
      );

      await RecapsController.createRecap(req, res);

      expect(createRecapSpy).toHaveBeenCalledWith(recap);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(recap);

      createRecapSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const createRecapSpy = (jest.spyOn(RecapsDao, "createRecap") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error"),
      );

      await RecapsController.createRecap(req, res);

      expect(createRecapSpy).toHaveBeenCalledWith(recap);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to create recap." });

      createRecapSpy.mockRestore();
    });
  });
});
