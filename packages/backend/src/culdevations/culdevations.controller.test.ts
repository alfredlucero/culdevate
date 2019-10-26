import CuldevationsController from "./culdevations.controller";
import CuldevationsDao from "./culdevations.dao";
import { mockRequest } from "../testUtils/mockRequest";
import { mockResponse } from "../testUtils/mockResponse";

describe("Culdevations Controller", () => {
  describe("When getting all culdevations", () => {
    test("should return 200 status with culdevations data on success", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const culdevations = [
        {
          culdevator: "Culdevator",
          title: "Culdevator Title",
          description: "Culdevator Description",
          score: 0,
        },
      ];
      const findAllCuldevationsSpy = (jest.spyOn(
        CuldevationsDao,
        "findAllCuldevations",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(culdevations));

      await CuldevationsController.getAllCuldevations(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(culdevations);

      findAllCuldevationsSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const findAllCuldevationsSpy = (jest.spyOn(
        CuldevationsDao,
        "findAllCuldevations",
      ) as jest.SpyInstance).mockImplementation(() => {
        // Can also do throw new Error("500 error");
        return Promise.reject("500 error");
      });

      await CuldevationsController.getAllCuldevations(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to retrieve all culdevations",
      });

      findAllCuldevationsSpy.mockRestore();
    });
  });

  describe("When getting a culdevation's details", () => {
    test("should return 200 status with culdevation details data on success", async () => {
      const culdevationId = "someCuldevationId";
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const foundCuldevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const findCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "findCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(foundCuldevation));

      await CuldevationsController.getCuldevationDetails(req, res);

      expect(findCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(foundCuldevation);

      findCuldevationByIdSpy.mockRestore();
    });

    test("should return 404 status with message for unmatched id", async () => {
      const culdevationId = "someCuldevationId";
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const findCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "findCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));

      await CuldevationsController.getCuldevationDetails(req, res);

      expect(findCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to find culdevation with matching id",
      });

      findCuldevationByIdSpy.mockRestore();
    });

    test("should return 500 status and message for server error", async () => {
      const culdevationId = "someCuldevationId";
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const findCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "findCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.reject("500 error"));

      await CuldevationsController.getCuldevationDetails(req, res);

      expect(findCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to retrieve culdevation details",
      });

      findCuldevationByIdSpy.mockRestore();
    });
  });

  describe("When creating a culdevation", () => {
    test("should return 201 status with created culdevation data on success", async () => {
      const culdevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const req = mockRequest({ body: culdevation });
      const res = mockResponse();
      const createCuldevationSpy = (jest.spyOn(
        CuldevationsDao,
        "createCuldevation",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(culdevation));

      await CuldevationsController.createCuldevation(req, res);

      expect(createCuldevationSpy).toHaveBeenCalledWith(culdevation);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(culdevation);

      createCuldevationSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const culdevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const req = mockRequest({ body: culdevation });
      const res = mockResponse();
      const createCuldevationSpy = (jest.spyOn(
        CuldevationsDao,
        "createCuldevation",
      ) as jest.SpyInstance).mockImplementation(() => Promise.reject("500 error"));

      await CuldevationsController.createCuldevation(req, res);

      expect(createCuldevationSpy).toHaveBeenCalledWith(culdevation);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to create culdevation",
      });

      createCuldevationSpy.mockRestore();
    });
  });

  describe("When updating culdevation's details", () => {
    test("should return 200 status with updated culdevation data on success", async () => {
      const culdevationId = "someCuldevationId";
      const culdevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const req = mockRequest({ params: { culdevationId }, body: culdevation });
      const res = mockResponse();
      const updateCuldevationSpy = (jest.spyOn(
        CuldevationsDao,
        "updateCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(culdevation));

      await CuldevationsController.updateCuldevation(req, res);

      expect(updateCuldevationSpy).toHaveBeenCalledWith(culdevationId, culdevation);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(culdevation);

      updateCuldevationSpy.mockRestore();
    });

    test("should return 404 status with message on unmatched id", async () => {
      const culdevationId = "someCuldevationId";
      const culdevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const req = mockRequest({ params: { culdevationId }, body: culdevation });
      const res = mockResponse();
      const updateCuldevationSpy = (jest.spyOn(
        CuldevationsDao,
        "updateCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));

      await CuldevationsController.updateCuldevation(req, res);

      expect(updateCuldevationSpy).toHaveBeenCalledWith(culdevationId, culdevation);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to find matching culdevation to update",
      });

      updateCuldevationSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const culdevationId = "someCuldevationId";
      const culdevation = {
        culdevator: "Culdevator",
        title: "Culdevator Title",
        description: "Culdevator Description",
        score: 0,
      };
      const req = mockRequest({ params: { culdevationId }, body: culdevation });
      const res = mockResponse();
      const updateCuldevationSpy = (jest.spyOn(
        CuldevationsDao,
        "updateCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.reject("500 error"));

      await CuldevationsController.updateCuldevation(req, res);

      expect(updateCuldevationSpy).toHaveBeenCalledWith(culdevationId, culdevation);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to update culdevation",
      });

      updateCuldevationSpy.mockRestore();
    });
  });

  describe("When deleting a culdevation", () => {
    test("should return 200 status with empty body object on success", async () => {
      const culdevationId = "someCuldevationId";
      const culdevationToDelete = {
        culdevation: "Culdevation",
        title: "Culdevation Title",
        description: "Culdevation Description",
        score: 0,
      };
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const removeCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "removeCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(culdevationToDelete));

      await CuldevationsController.deleteCuldevation(req, res);

      expect(removeCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(culdevationToDelete);

      removeCuldevationByIdSpy.mockRestore();
    });

    test("should return 404 status with message on unmatched id", async () => {
      const culdevationId = "someCuldevationId";
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const removeCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "removeCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.resolve(null));

      await CuldevationsController.deleteCuldevation(req, res);

      expect(removeCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to find matching culdevation to delete",
      });

      removeCuldevationByIdSpy.mockRestore();
    });

    test("should return 500 status with message on server error", async () => {
      const culdevationId = "someCuldevationId";
      const req = mockRequest({ params: { culdevationId } });
      const res = mockResponse();
      const removeCuldevationByIdSpy = (jest.spyOn(
        CuldevationsDao,
        "removeCuldevationById",
      ) as jest.SpyInstance).mockImplementation(() => Promise.reject("500 error"));

      await CuldevationsController.deleteCuldevation(req, res);

      expect(removeCuldevationByIdSpy).toHaveBeenCalledWith(culdevationId);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to delete culdevation",
      });

      removeCuldevationByIdSpy.mockRestore();
    });
  });
});
