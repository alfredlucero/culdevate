import { RecapSchema, MAX_BULLETPOINT_LENGTH, MAX_BULLETPOINTS } from "./recaps.validation";
import { RecapKind } from "./recaps.model";

describe("Recap Validation", () => {
  const formBaseRecap = (kind: RecapKind | string) => ({
    kind,
    startDate: new Date(),
    endDate: new Date(),
    bulletPoints: [],
  });

  describe("When validating bulletPoints", () => {
    test("should be invalid when bullet point length is greater than max length", () => {
      const tooLongBulletPoint = "a".repeat(MAX_BULLETPOINT_LENGTH + 1);
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Other"),
        bulletPoints: [tooLongBulletPoint],
        title: "OtherTitle",
      });

      expect(error).toBeTruthy();
    });

    test("should be invalid when number of bullet points is greater than max", () => {
      const tooManyBulletPoints = Array.from({ length: MAX_BULLETPOINTS + 1 }).map(() => "bulletpoint");
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Other"),
        bulletPoints: tooManyBulletPoints,
        title: "Other Title",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating kind discriminator", () => {
    test("should be invalid when given unknown kind value", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("UnknownKind"),
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapWorkExperience", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("WorkExperience"),
        title: "Work Title",
        location: "Work Location",
        company: "Work Company",
        employmentType: "Part-Time",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("WorkExperience"),
        title: "Work Title",
        location: "Work Location",
        company: "Work Company",
        employmentType: "Part-Time",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });

    test("should be invalid given unknown employment type", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("WorkExperience"),
        title: "Work Title",
        location: "Work Location",
        company: "Work Company",
        employmentType: "invalidEmploymentType",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapEducation", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Education"),
        school: "School",
        location: "Location",
        degree: "BS",
        fieldOfStudy: "Computer Science",
        grade: "Alumnus",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Education"),
        school: "School",
        location: "Location",
        degree: "BS",
        fieldOfStudy: "Computer Science",
        grade: "Alumnus",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapAccomplishments", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Accomplishments"),
        title: "Accomplishments Title",
        type: "Career",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown type", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Accomplishments"),
        title: "Accomplishments Title",
        type: "Unknown",
      });

      expect(error).toBeTruthy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Accomplishments"),
        title: "Accomplishments Title",
        type: "Personal",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapSkills", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Skills"),
        title: "Skills Title",
        proficiency: "Novice",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid given unknown proficiency", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Skills"),
        title: "Skills Title",
        proficiency: "Unknown",
      });

      expect(error).toBeTruthy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Skills"),
        title: "Skills Title",
        proficiency: "Advanced",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapPublications", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Publications"),
        title: "Publication Title",
        type: "Book",
        coauthors: "Coauthors",
        publisher: "Publisher",
        url: "url.com",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid given unknown type", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Publications"),
        title: "Publication Title",
        type: "Unknown",
        coauthors: "Coauthors",
        publisher: "Publisher",
        url: "url.com",
      });

      expect(error).toBeTruthy();
    });

    test("should be invalid given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Publications"),
        title: "Publication Title",
        type: "Journal",
        coauthors: "Coauthors",
        publisher: "Publisher",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapSideProjects", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("SideProjects"),
        title: "Side Project Title",
        creators: "Creators",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("SideProjects"),
        title: "Side Project Title",
        creators: "Creators",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapOrganizations", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Organizations"),
        organizationName: "orgName",
        location: "orgLocation",
        positions: "orgPositions",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Organizations"),
        organizationName: "orgName",
        location: "orgLocation",
        positions: "orgPositions",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapReferences", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("References"),
        company: "Company",
        title: "Manager",
        phoneNumber: "911",
        email: "manager@company.com",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("References"),
        company: "Company",
        title: "Manager",
        phoneNumber: "911",
        email: "manager@company.com",
        wrongProperty: "wrongProperty",
      });

      expect(error).toBeTruthy();
    });
  });

  describe("When validating RecapOther", () => {
    test("should be valid given required properties", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Other"),
        title: "OtherTitle",
      });

      expect(error).toBeFalsy();
    });

    test("should be invalid when given unknown property", () => {
      const { error } = RecapSchema.validate({
        ...formBaseRecap("Other"),
        title: "Other Title",
        wrongProperty: "OtherTitle",
      });

      expect(error).toBeTruthy();
    });
  });
});
