import {
  RecapWorkExperienceModel,
  RecapEducationModel,
  RecapAccomplishmentsModel,
  RecapPublicationsModel,
  RecapSkillsModel,
  RecapSideProjectsModel,
  RecapOrganizationsModel,
  RecapReferencesModel,
  RecapOtherModel,
} from "./recaps.model";

describe("Recaps Model", () => {
  describe("When forming RecapWorkExperience", () => {
    test("should validate without error given all required properties", () => {
      const validRecapWorkExperienceModel = new RecapWorkExperienceModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Work Title",
        location: "Work Location",
        company: "Work Company",
        employmentType: "Part-Time",
      });

      const validationErrors = validRecapWorkExperienceModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required title property", () => {
      const invalidRecapWorkExperienceModel = new RecapWorkExperienceModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        location: "Work Location",
        company: "Work Company",
        employmentType: "Part-Time",
      });

      const validationErrors = invalidRecapWorkExperienceModel.validateSync();

      expect(validationErrors.errors.title).toBeTruthy();
    });
  });

  describe("When forming RecapEducation", () => {
    test("should validate without error given all required properties", () => {
      const validRecapEducationModel = new RecapEducationModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        school: "School",
        location: "Location",
        degree: "Degree",
        fieldOfStudy: "Field of Study",
        grade: "Alumnus",
      });

      const validationErrors = validRecapEducationModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required school property", () => {
      const invalidRecapEducationModel = new RecapEducationModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        location: "Location",
        degree: "Degree",
        fieldOfStudy: "Field of Study",
        grade: "Alumnus",
      });

      const validationErrors = invalidRecapEducationModel.validateSync();

      expect(validationErrors.errors.school).toBeTruthy();
    });
  });

  describe("When forming RecapAccomplishments", () => {
    test("should validate without error given all required properties", () => {
      const validRecapAccomplishmentsModel = new RecapAccomplishmentsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Accomplishments Title",
        type: "Career",
      });

      const validationErrors = validRecapAccomplishmentsModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required title property", () => {
      const invalidRecapAccomplishmentsModel = new RecapAccomplishmentsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        type: "School",
      });

      const validationErrors = invalidRecapAccomplishmentsModel.validateSync();

      expect(validationErrors.errors.title).toBeTruthy();
    });
  });

  describe("When forming RecapPublications", () => {
    test("should validate without error given all required properties", () => {
      const validRecapPublicationsModel = new RecapPublicationsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Publications Title",
        type: "Blog",
        coauthors: "Coauthors",
        publisher: "Publisher",
        url: "Url",
      });

      const validationErrors = validRecapPublicationsModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required type property", () => {
      const invalidRecapPublicationsModel = new RecapPublicationsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Publications Title",
        coauthors: "Coauthors",
        publisher: "Publisher",
        url: "Url",
      });

      const validationErrors = invalidRecapPublicationsModel.validateSync();

      expect(validationErrors.errors.type).toBeTruthy();
    });
  });

  describe("When forming RecapSkills", () => {
    test("should validate without error given all required properties", () => {
      const validRecapSkillsModel = new RecapSkillsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Skill",
        proficiency: "Novice",
      });

      const validationErrors = validRecapSkillsModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required proficiency property", () => {
      const invalidRecapSkillsModel = new RecapSkillsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Skill",
      });

      const validationErrors = invalidRecapSkillsModel.validateSync();

      expect(validationErrors.errors.proficiency).toBeTruthy();
    });
  });

  describe("When forming RecapSideProjects", () => {
    test("should validate without error given all required properties", () => {
      const validRecapSideProjectsModel = new RecapSideProjectsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Side Project",
        creators: "Creators",
      });

      const validationErrors = validRecapSideProjectsModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required creators property", () => {
      const invalidRecapSideProjectsModel = new RecapSideProjectsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Side Project",
      });

      const validationErrors = invalidRecapSideProjectsModel.validateSync();

      expect(validationErrors.errors.creators).toBeTruthy();
    });
  });

  describe("When forming RecapOrganizations", () => {
    test("should validate without error given all required properties", () => {
      const validRecapOrganizationsModel = new RecapOrganizationsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        organizationName: "Organization",
        location: "Location",
        positions: "Positions",
      });

      const validationErrors = validRecapOrganizationsModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required positions property", () => {
      const invalidRecapOrganizationsModel = new RecapOrganizationsModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        organizationName: "Organization",
        location: "Location",
      });

      const validationErrors = invalidRecapOrganizationsModel.validateSync();

      expect(validationErrors.errors.positions).toBeTruthy();
    });
  });

  describe("When forming RecapReferences", () => {
    test("should validate without error given all required properties", () => {
      const validRecapReferencesModel = new RecapReferencesModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        company: "Company",
        title: "Reference Title",
        phoneNumber: "911",
        email: "reference@email.com",
      });

      const validationErrors = validRecapReferencesModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required email property", () => {
      const invalidRecapReferencesModel = new RecapReferencesModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        company: "Company",
        title: "Reference Title",
        phoneNumber: "911",
      });

      const validationErrors = invalidRecapReferencesModel.validateSync();

      expect(validationErrors.errors.email).toBeTruthy();
    });
  });

  describe("When forming RecapOther", () => {
    test("should validate without error given all required properties", () => {
      const validRecapOtherModel = new RecapOtherModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
        title: "Other Title",
      });

      const validationErrors = validRecapOtherModel.validateSync();

      expect(validationErrors).toBeFalsy();
    });

    test("should have validation error without required title property", () => {
      const invalidRecapOtherModel = new RecapOtherModel({
        startDate: new Date(),
        endDate: new Date(),
        bulletPoints: [],
      });

      const validationErrors = invalidRecapOtherModel.validateSync();

      expect(validationErrors.errors.title).toBeTruthy();
    });
  });
});
