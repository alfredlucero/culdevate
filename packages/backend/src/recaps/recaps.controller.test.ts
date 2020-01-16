import RecapsController from "./recaps.controller";
import RecapsDao from "./recaps.dao";
import { Recap } from "./recaps.model";
import { mockRequestWithUser } from "../testUtils/mockRequestWithUser";
import { mockResponse } from "../testUtils/mockResponse";
import { generateObjectIdString } from "../testUtils/generateObjectId";

describe("Recaps Controller", () => {
  const userId = generateObjectIdString();
  const recapId = generateObjectIdString();

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

  describe("When reading all recaps for a user", () => {
    test("should return 200 status with recaps on success", async () => {
      const foundRecaps: Recap[] = [
        {
          kind: "Skills",
          proficiency: "Advanced",
          bulletPoints: [],
          title: "Skills Title",
          userId,
        },
      ];
      const req = mockRequestWithUser({
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findAllRecapsSpy = (jest.spyOn(RecapsDao, "findAllRecaps") as jest.SpyInstance).mockImplementation(
        () => foundRecaps,
      );

      await RecapsController.getAllRecaps(req, res);

      expect(findAllRecapsSpy).toHaveBeenCalledWith(userId);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(foundRecaps);

      findAllRecapsSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const req = mockRequestWithUser({
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findAllRecapsSpy = (jest.spyOn(RecapsDao, "findAllRecaps") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error"),
      );

      await RecapsController.getAllRecaps(req, res);

      expect(findAllRecapsSpy).toHaveBeenCalledWith(userId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to find recaps for user" });

      findAllRecapsSpy.mockRestore();
    });
  });

  describe("When reading a recap's details", () => {
    test("should return 200 status with recap details on success", async () => {
      const foundRecap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdAndUserIdSpy = (jest.spyOn(
        RecapsDao,
        "findRecapByIdAndUserId",
      ) as jest.SpyInstance).mockImplementation(() => foundRecap);

      await RecapsController.getRecapDetails(req, res);

      expect(findRecapByIdAndUserIdSpy).toHaveBeenCalledWith({ recapId, userId });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(foundRecap);

      findRecapByIdAndUserIdSpy.mockRestore();
    });

    test("should return 404 status with message on unmatched recap id", async () => {
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdAndUserIdSpy = (jest.spyOn(
        RecapsDao,
        "findRecapByIdAndUserId",
      ) as jest.SpyInstance).mockImplementation(() => null);

      await RecapsController.getRecapDetails(req, res);

      expect(findRecapByIdAndUserIdSpy).toHaveBeenCalledWith({ recapId, userId });

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to find matching recap details" });

      findRecapByIdAndUserIdSpy.mockRestore();
    });

    test("should return 500 status with message on find recap by id server error", async () => {
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdAndUserIdSpy = (jest.spyOn(
        RecapsDao,
        "findRecapByIdAndUserId",
      ) as jest.SpyInstance).mockImplementation(() => Promise.reject("500 error"));

      await RecapsController.getRecapDetails(req, res);

      expect(findRecapByIdAndUserIdSpy).toHaveBeenCalledWith({ recapId, userId });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to find recap details" });

      findRecapByIdAndUserIdSpy.mockRestore();
    });
  });

  describe("When updating a recap", () => {
    test("should return 200 status with updated recap data on success", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => recap,
      );
      const updateRecapByIdSpy = (jest.spyOn(RecapsDao, "updateRecapById") as jest.SpyInstance).mockImplementation(() =>
        Promise.resolve(recap),
      );

      await RecapsController.updateRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);
      expect(updateRecapByIdSpy).toHaveBeenCalledWith({ recapId, updatedRecap: { ...recap, userId } });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(recap);

      findRecapByIdSpy.mockRestore();
      updateRecapByIdSpy.mockRestore();
    });

    test("should return 404 status with message on unmatched recap id", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => null,
      );

      await RecapsController.updateRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to find matching recap to update" });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 404 status with message on unmatched user id", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(() => ({
        userId: "unmatchedUserId",
      }));

      await RecapsController.updateRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to find matching recap to update" });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 500 status with message on find recap by id server error", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error"),
      );

      await RecapsController.updateRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to update recap" });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 500 status with message on update recap by id server error", async () => {
      const recap: Recap = {
        kind: "Skills",
        proficiency: "Advanced",
        bulletPoints: [],
        title: "Skills Title",
        userId,
      };
      const req = mockRequestWithUser({
        body: recap,
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => recap,
      );
      const updateRecapByIdSpy = (jest.spyOn(RecapsDao, "updateRecapById") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error"),
      );

      await RecapsController.updateRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);
      expect(updateRecapByIdSpy).toHaveBeenCalledWith({ recapId, updatedRecap: { ...recap, userId } });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to update recap" });

      findRecapByIdSpy.mockRestore();
      updateRecapByIdSpy.mockRestore();
    });
  });

  describe("When deleting a recap", () => {
    test("should return 200 status with deleted recap on success", async () => {
      const recap: Recap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
        userId,
      };
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => recap,
      );
      const deleteRecapByIdSpy = (jest.spyOn(RecapsDao, "removeRecapById") as jest.SpyInstance).mockImplementation(
        () => recap,
      );

      await RecapsController.deleteRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);
      expect(deleteRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(recap);

      deleteRecapByIdSpy.mockRestore();
      findRecapByIdSpy.mockRestore();
    });

    test("should return 404 status with message for unmatched recap id", async () => {
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => null,
      );

      await RecapsController.deleteRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to find matching recap to delete",
      });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 404 status with message for unmatched user id", async () => {
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(() => ({
        userId: "unmatchedUserIdHash",
      }));

      await RecapsController.deleteRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to find matching recap to delete",
      });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 500 status with message on find recap by id server error", async () => {
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error find recap by id"),
      );

      await RecapsController.deleteRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to delete recap",
      });

      findRecapByIdSpy.mockRestore();
    });

    test("should return 500 status with message on remove recap by id server error", async () => {
      const recap: Recap = {
        kind: "Other",
        bulletPoints: [],
        title: "Other Title",
        userId,
      };
      const req = mockRequestWithUser({
        params: {
          recapId,
        },
        user: {
          username: "user",
          email: "user@test.com",
          id: userId,
        },
      });
      const res = mockResponse();
      const findRecapByIdSpy = (jest.spyOn(RecapsDao, "findRecapById") as jest.SpyInstance).mockImplementation(
        () => recap,
      );
      const removeRecapByIdSpy = (jest.spyOn(RecapsDao, "removeRecapById") as jest.SpyInstance).mockImplementation(() =>
        Promise.reject("500 error remove recap by id"),
      );

      await RecapsController.deleteRecap(req, res);

      expect(findRecapByIdSpy).toHaveBeenCalledWith(recapId);
      expect(removeRecapByIdSpy).toHaveBeenCalledWith(recapId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to delete recap",
      });

      findRecapByIdSpy.mockRestore();
      removeRecapByIdSpy.mockRestore();
    });
  });
});
