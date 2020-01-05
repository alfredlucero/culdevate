import RecapsDao from "./recaps.dao";
import {
  RecapWorkExperienceModel,
  RecapWorkExperience,
  RecapEducation,
  RecapAccomplishments,
  RecapPublications,
  RecapSkillsModel,
  RecapSkills,
  RecapSideProjects,
  RecapOrganizations,
  RecapReferences,
  RecapOtherModel,
  RecapOther,
} from "./recaps.model";
import DbTestHelper from "../testUtils/dbTestHelper";
import { generateObjectId } from "../testUtils/generateObjectId";

const dbTestHelper = new DbTestHelper();

const userId = generateObjectId();
const userIdString = userId.toString();
const formBaseRecap = () => ({
  startDate: new Date(),
  endDate: new Date(),
  bulletPoints: [],
  userId,
});

describe("Recaps Dao", () => {
  beforeAll(async () => {
    await dbTestHelper.startDb();
  });

  test("should find all recaps", async () => {
    const workExperienceRecap: RecapWorkExperience = {
      ...formBaseRecap(),
      kind: "WorkExperience",
      title: "Job Title",
      location: "Job Location",
      company: "Company",
      employmentType: "Full-Time",
    };
    const workExperienceRecapModel = new RecapWorkExperienceModel(workExperienceRecap);

    const skillsRecap: RecapSkills = {
      ...formBaseRecap(),
      kind: "Skills",
      title: "Skill",
      proficiency: "Advanced",
    };
    const skillsRecapModel = new RecapSkillsModel(skillsRecap);

    await Promise.all([workExperienceRecapModel.save(), skillsRecapModel.save()]);

    const actualFoundRecaps = await RecapsDao.findAllRecaps(userIdString);
    const expectedFoundRecaps = [workExperienceRecap, skillsRecap];

    // Workaround to compare these objects: https://github.com/facebook/jest/issues/8475
    expect(actualFoundRecaps.map(actualFoundRecap => actualFoundRecap.toObject())).toMatchObject(expectedFoundRecaps);
  });

  test("should find recap by id", async () => {
    const otherRecap: RecapOther = {
      ...formBaseRecap(),
      kind: "Other",
      title: "Other Title",
    };
    const otherRecapModel = new RecapOtherModel(otherRecap);

    await otherRecapModel.save();

    const actualFoundRecap = await RecapsDao.findRecapById(otherRecapModel._id);
    const expectedFoundRecap = otherRecap;

    expect(actualFoundRecap.toObject()).toMatchObject(expectedFoundRecap);
  });

  test("should be able to create a work experience recap", async () => {
    const workExperienceRecap: RecapWorkExperience = {
      ...formBaseRecap(),
      kind: "WorkExperience",
      title: "Job Title",
      location: "Job Location",
      company: "Company",
      employmentType: "Full-Time",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(workExperienceRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(workExperienceRecap);
  });

  test("should be able to create an education recap", async () => {
    const educationRecap: RecapEducation = {
      ...formBaseRecap(),
      kind: "Education",
      school: "School",
      location: "Location",
      fieldOfStudy: "Field of Study",
      degree: "Degree",
      grade: "Alumnus",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(educationRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(educationRecap);
  });

  test("should be able to create an accomplishments recap", async () => {
    const accomplishmentsRecap: RecapAccomplishments = {
      ...formBaseRecap(),
      kind: "Accomplishments",
      type: "Career",
      title: "Accomplishment Title",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(accomplishmentsRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(accomplishmentsRecap);
  });

  test("should be able to create a publications recap", async () => {
    const publicationsRecap: RecapPublications = {
      ...formBaseRecap(),
      kind: "Publications",
      title: "Title",
      type: "Blog",
      coauthors: "Authors",
      url: "Url",
      publisher: "Publisher",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(publicationsRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(publicationsRecap);
  });

  test("should be able to create a skills recap", async () => {
    const skillsRecap: RecapSkills = {
      ...formBaseRecap(),
      kind: "Skills",
      title: "Title",
      proficiency: "Expert",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(skillsRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(skillsRecap);
  });

  test("should be able to create a side projects recap", async () => {
    const sideProjectsRecap: RecapSideProjects = {
      ...formBaseRecap(),
      kind: "SideProjects",
      title: "Title",
      creators: "Creators",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(sideProjectsRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(sideProjectsRecap);
  });

  test("should be able to create an organizations recap", async () => {
    const organizationsRecap: RecapOrganizations = {
      ...formBaseRecap(),
      kind: "Organizations",
      organizationName: "Name",
      positions: "Positions",
      location: "Location",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(organizationsRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(organizationsRecap);
  });

  test("should be able to create a references recap", async () => {
    const referencesRecap: RecapReferences = {
      ...formBaseRecap(),
      kind: "References",
      company: "Company",
      title: "Title",
      phoneNumber: "911",
      email: "email@domain.com",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(referencesRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(referencesRecap);
  });

  test("should be able to create an other recap", async () => {
    const otherRecap: RecapOther = {
      ...formBaseRecap(),
      kind: "Other",
      title: "Other Title",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(otherRecap);
    const foundCreatedRecap = await RecapsDao.findRecapById(actualCreatedRecap._id);

    expect(foundCreatedRecap.toObject()).toMatchObject(otherRecap);
  });

  test("should be able to update a work experience recap", async () => {
    const workExperienceRecap: RecapWorkExperience = {
      ...formBaseRecap(),
      kind: "WorkExperience",
      title: "Job Title",
      location: "Job Location",
      company: "Company",
      employmentType: "Full-Time",
    };
    const createdRecap = await RecapsDao.createRecap(workExperienceRecap);

    const updatedWorkExperienceRecap: RecapWorkExperience = {
      ...workExperienceRecap,
      bulletPoints: ["Bullet point"],
      title: "Updated Job Title",
      location: "Updated Job Location",
      company: "Updated Company",
      employmentType: "Part-Time",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedWorkExperienceRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedWorkExperienceRecap);
  });

  test("should be able to update an education recap", async () => {
    const educationRecap: RecapEducation = {
      ...formBaseRecap(),
      kind: "Education",
      school: "School",
      location: "Location",
      fieldOfStudy: "Field of Study",
      degree: "Degree",
      grade: "Alumnus",
    };
    const createdRecap = await RecapsDao.createRecap(educationRecap);

    const updatedEducationRecap: RecapEducation = {
      ...educationRecap,
      school: "Updated School",
      location: "Updated Location",
      fieldOfStudy: "Updated Field of Study",
      degree: "Updated Degree",
      grade: "Updated Grade",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedEducationRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedEducationRecap);
  });

  test("should be able to update an accomplishments recap", async () => {
    const accomplishmentsRecap: RecapAccomplishments = {
      ...formBaseRecap(),
      kind: "Accomplishments",
      type: "Career",
      title: "Accomplishment Title",
    };
    const createdRecap = await RecapsDao.createRecap(accomplishmentsRecap);

    const updatedAccomplishmentsRecap: RecapAccomplishments = {
      ...accomplishmentsRecap,
      type: "Personal",
      title: "Updated Title",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedAccomplishmentsRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedAccomplishmentsRecap);
  });

  test("should be able to update a publications recap", async () => {
    const publicationsRecap: RecapPublications = {
      ...formBaseRecap(),
      kind: "Publications",
      title: "Title",
      type: "Blog",
      coauthors: "Authors",
      url: "Url",
      publisher: "Publisher",
    };
    const createdRecap = await RecapsDao.createRecap(publicationsRecap);

    const updatedPublicationsRecap: RecapPublications = {
      ...publicationsRecap,
      title: "Updated Title",
      type: "Book",
      coauthors: "Updated Authors",
      url: "Updated Url",
      publisher: "Updated Publisher",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedPublicationsRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedPublicationsRecap);
  });

  test("should be able to update a skills recap", async () => {
    const skillsRecap: RecapSkills = {
      ...formBaseRecap(),
      kind: "Skills",
      title: "Title",
      proficiency: "Expert",
    };
    const createdRecap = await RecapsDao.createRecap(skillsRecap);

    const updatedSkillsRecap: RecapSkills = {
      ...skillsRecap,
      title: "Updated Title",
      proficiency: "Novice",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedSkillsRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedSkillsRecap);
  });

  test("should be able to update a side projects recap", async () => {
    const sideProjectsRecap: RecapSideProjects = {
      ...formBaseRecap(),
      kind: "SideProjects",
      title: "Title",
      creators: "Creators",
    };
    const createdRecap = await RecapsDao.createRecap(sideProjectsRecap);

    const updatedSideProjectsRecap: RecapSideProjects = {
      ...sideProjectsRecap,
      title: "Updated Title",
      creators: "Updated Creators",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedSideProjectsRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedSideProjectsRecap);
  });

  test("should be able to update an organizations recap", async () => {
    const organizationsRecap: RecapOrganizations = {
      ...formBaseRecap(),
      kind: "Organizations",
      organizationName: "Name",
      positions: "Positions",
      location: "Location",
    };
    const createdRecap = await RecapsDao.createRecap(organizationsRecap);

    const updatedOrganizationsRecap: RecapOrganizations = {
      ...organizationsRecap,
      organizationName: "Updated Name",
      positions: "Updated Positions",
      location: "Updated Location",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedOrganizationsRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedOrganizationsRecap);
  });

  test("should be able to update a references recap", async () => {
    const referencesRecap: RecapReferences = {
      ...formBaseRecap(),
      kind: "References",
      company: "Company",
      title: "Title",
      phoneNumber: "911",
      email: "email@domain.com",
    };
    const createdRecap = await RecapsDao.createRecap(referencesRecap);

    const updatedReferencesRecap: RecapReferences = {
      ...referencesRecap,
      company: "Updated Company",
      title: "Updated Title",
      phoneNumber: "562",
      email: "updatedemail@domain.com",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedReferencesRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedReferencesRecap);
  });

  test("should be able to update an other recap", async () => {
    const otherRecap: RecapOther = {
      ...formBaseRecap(),
      kind: "Other",
      title: "Other Title",
    };
    const createdRecap = await RecapsDao.createRecap(otherRecap);

    const updatedOtherRecap: RecapOther = {
      ...otherRecap,
      title: "Updated Title",
    };
    const actualUpdatedRecap = await RecapsDao.updateRecapById({
      recapId: createdRecap._id,
      updatedRecap: updatedOtherRecap,
    });
    const foundUpdatedRecap = await RecapsDao.findRecapById(actualUpdatedRecap._id);

    expect(foundUpdatedRecap.toObject()).toMatchObject(updatedOtherRecap);
  });

  test("should be able to remove recap by id", async () => {
    const otherRecap: RecapOther = {
      ...formBaseRecap(),
      kind: "Other",
      title: "Other Title",
    };
    const actualCreatedRecap = await RecapsDao.createRecap(otherRecap);

    const actualRemovedRecap = await RecapsDao.removeRecapById(actualCreatedRecap._id);
    const findRemovedRecapResult = await RecapsDao.findRecapById(actualRemovedRecap._id);

    expect(findRemovedRecapResult).toBeNull();
  });

  afterEach(async () => {
    await dbTestHelper.cleanUpDb();
  });

  afterAll(async () => {
    await dbTestHelper.stopDb();
  });
});
